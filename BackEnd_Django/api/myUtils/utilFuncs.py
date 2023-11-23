
from django.http import JsonResponse
from ..myModels.translation import Translation

def getDictionary():
    # Obtener data para diccionario de traducciones
    rowsTranslations = Translation.objects.values('strTranslation', 'strLabelKey')

    # Construir diccionario de traducciones
    dict_translations = {}
    for dataTranslation in rowsTranslations:
        if dataTranslation['strTranslation']:
            dict_translations[dataTranslation['strLabelKey']] = JsonResponse.loads(dataTranslation['strTranslation'])
        else:
            dict_translations[dataTranslation['strLabelKey']] = {}

    # Entregar diccionario de traducciones
    return dict_translations
