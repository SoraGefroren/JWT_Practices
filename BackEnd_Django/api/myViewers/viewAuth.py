import bcrypt
from django.utils import timezone
from django.http import JsonResponse
from ..myModels.logError import LogError
from ..myModels.logAccess import LogAccess
from ..myUtils.utilAuth import generateAccessToken, generateRefreshToken, renewAccessToken, verifyRefreshToken

def login(request, *args, **kwargs):
    extLanguage = None
    try:
        if request.GET.get('language'):
            extLanguage = request.GET.get('language') or None
        passwordMatch = bcrypt.hashpw('test123'.encode('utf-8'), bcrypt.gensalt())
        return JsonResponse({
            'accessToken': [],
            'refreshToken': [],
            'userLanguage': []
        })
    except Exception as error:
        # Manejar el error
        print(error)
        LogError.objects.create(
            strAddress=request.META.get('REMOTE_ADDR'),
            strAppOrigin='viewAuth',
            strParameters=str(request.POST or {}),
            strError=str(error),
            timeStamp=timezone.now(),
        )
        return JsonResponse({'error': request.translate(request, 'internalServerError', extLanguage)}, status=500)

def renewAccessToken(request, *args, **kwargs):
    return JsonResponse({'message': '', 'token': None})

def verifyRefreshToken(request, *args, **kwargs):
    return JsonResponse({'message': '', 'token': None})