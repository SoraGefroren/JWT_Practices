from django.utils import timezone
from django.http import JsonResponse
from ..myModels.language import Language
from ..myModels.logError import LogError
from ..myUtils.utilFuncs import getDictionary

def index(request, *args, **kwargs):
    return JsonResponse({
        'message': request.translate('greetings')
    })

def languages(request, *args, **kwargs):
    extLanguage = None
    try:
        if request.GET.get('language'):
            extLanguage = request.GET.get('language') or None
        listLangs = []
        languages = Language.objects.select_related('ideTranslation').all()
        for lang in languages:
                keyName = lang.ideTranslation.strLabelKey
                listLangs.append({
                    'trans': keyName,
                    'lang': lang.ideLanguage,
                    'language': request.translate(keyName, extLanguage)
                })
        return JsonResponse({'languages': listLangs})
    except Exception as error:
        # Manejar el error
        print(error)
        LogError.objects.create(
            strAddress=request.META.get('REMOTE_ADDR'),
            strAppOrigin='viewFree',
            strParameters=str(request.GET or {}),
            strError=str(error),
            timeStamp=timezone.now(),
        )
        return JsonResponse({'error': request.translate(request, 'internalServerError', extLanguage)}, status=500)

def translations(request, *args, **kwargs):
    translations = getDictionary()
    language = None
    if kwargs.get('language'):
        language = kwargs.get('language') or None
    if translations:
        translationObject = {}
        if not language:
            translationObject = translations
        else:
            for key in translations:
                if translations.get(key) and translations[key].get(language):
                    translationObject[key] = translations[key][language] or ''
        return JsonResponse({'translations': translationObject})
    else:
        return JsonResponse({'translations': None})