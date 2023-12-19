from django.http import JsonResponse
from ..myModels.itemMenu import ItemMenu
from ..myModels.logError import LogError
from ..myModels.userType import UserType
from ..myModels.translation import Translation
from ..myModels.userTypeHasItemMenu import UserTypeHasItemMenu
from ..myUtils.utilAuth import protectRoute
from datetime import datetime, timedelta
from django.utils import timezone
import random

@protectRoute
def index(request, *args, **kwargs):
    if request.userLogged:
        return JsonResponse({'message': 'greetings' + request.userLogged.strUserName})
    else:
        return JsonResponse({'message': 'greetings'})

@protectRoute
def tests(request, *args, **kwargs):
    def get_random_string(min_length, max_length):
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        length = random.randint(min_length, max_length)
        result = ''.join(random.choice(characters) for _ in range(length))
        return result
    def get_random_date():
        start_date = datetime(2000, 1, 1)
        end_date = datetime.now()
        random_date = start_date + timedelta(seconds=random.randint(0, int((end_date - start_date).total_seconds())))
        return random_date.strftime('%Y-%m-%d')
    def generate_random_list(length):
        return [
            {
                'strNoun': get_random_string(10, 25),
                'datTest': get_random_date(),
            }
            for _ in range(length)
        ]
    return JsonResponse({
        'list': generate_random_list(100)
    })

@protectRoute
def userInfo(request, *args, **kwargs):
    ipAddress = request.META.get('REMOTE_ADDR')
    try:
        if request.userLogged:
            return JsonResponse({
                'message': request.translate('greetings') + request.userLogged.strUserName,
                'userInfo': {
                    'strUserName': request.userLogged.strUserName
                }
            })
        else:
            return JsonResponse({
                'message': request.translate('greetings'),
                'userInfo': None
            })
    except Exception as error:
        # Manejar el error
        print(error)
        LogError.objects.create(
            strAddress=ipAddress,
            strAppOrigin='viewApi',
            strParameters=str(request.GET or {}),
            strError=str(error),
            timeStamp=timezone.now,
        )
        return JsonResponse({'message': request.translate('internalServerError')})

@protectRoute
def listMenus(request, *args, **kwargs):
    ipAddress = request.META.get('REMOTE_ADDR')
    try:
        if request.userLogged:
            listMenus = []
            if request.userLogged.ideUserType:
                userType = UserType.objects.prefetch_related(
                    'tblusertypehasitemmenu_set__tblitemmenu__idetranslation'
                ).get(ideUserType=request.userLogged.ideUserType)
                if userType and userType.tblusertypehasitemmenu_set.all():
                    for rowUserTypeHasItemMenus in userType.tblusertypehasitemmenu_set.all():
                        translationKey = rowUserTypeHasItemMenus.tblitemmenu.idetranslation.strLabelKey
                        listMenus.append({
                            'trans': translationKey,
                            'name': rowUserTypeHasItemMenus.tblitemmenu.idetranslation.strTranslation,
                            'link': rowUserTypeHasItemMenus.tblitemmenu.strLink,
                        })
            return JsonResponse({
                'message': request.translate('greetings') + request.userLogged.strUserName,
                'listMenus': listMenus
            })
        else:
            return JsonResponse({
                'message': request.translate('greetings'),
                'listMenus': []
            })
    except Exception as error:
        # Manejar el error
        print(error)
        LogError.objects.create(
            strAddress=ipAddress,
            strAppOrigin='viewApi',
            strParameters=str(request.GET or {}),
            strError=str(error),
            timeStamp=timezone.now,
        )
        return JsonResponse({'message': request.translate('internalServerError')})