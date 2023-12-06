import json
from ..myModels.translation import Translation

def createTranslateFunction(dictTranslations, tagLanguage):
    def translateFunction(labelKey, pmLanguage=None):
        curtLanguage = pmLanguage or tagLanguage
        if dictTranslations and dictTranslations.get(labelKey) and dictTranslations[labelKey].get(curtLanguage):
            return dictTranslations[labelKey][curtLanguage] or ''
        else:
            return labelKey or ''
    return translateFunction

def getDictionary():
    # Obtener data para diccionario de traducciones
    rowsTranslations = Translation.objects.values('strTranslation', 'strLabelKey')

    # Construir diccionario de traducciones
    dict_translations = {}
    for dataTranslation in rowsTranslations:
        if dataTranslation['strTranslation']:
            dict_translations[dataTranslation['strLabelKey']] = json.loads(dataTranslation['strTranslation'])
        else:
            dict_translations[dataTranslation['strLabelKey']] = {}

    # Entregar diccionario de traducciones
    return dict_translations
