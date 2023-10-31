const { getTokenUser } = require('../config/auth');
const Translation = require('../models/translation');

exports.getDictionary = async () => {
    // Obtener data para diccionario de traducciones
    const rowsTranslations = await Translation.findAll({
        attributes: ['strTranslation', 'strLabelKey'],
    });
    // Construir diccionario de traducciones
    let dictTranslations = {};
    if (dictTranslations) {
        for (let dataTranslation of rowsTranslations) {
            if (dataTranslation.strTranslation) {
                dictTranslations[dataTranslation.strLabelKey] = JSON.parse(dataTranslation.strTranslation);
            } else {
                dictTranslations[dataTranslation.strLabelKey] = {};
            }
        }
    }
    // Entregar diccionario de traducciones
    return dictTranslations;
};

exports.middleware = async (req, res, next) => {
    const { user, tagLanguage } = await getTokenUser(null, req);
    const dictTranslations = await this.getDictionary();
    // Almacenar el idioma actual en la variable de entorno o en el objeto req
    res.locals.language = tagLanguage;
    req.language = tagLanguage;
    // Agregar una función de traducción al objeto res para facilitar su acceso en las rutas y controladores
    res.translate = (labelKey, pmLanguage = null) => {
        const curtLanguage = pmLanguage ?? tagLanguage;
        if (dictTranslations && dictTranslations[labelKey] && dictTranslations[labelKey][curtLanguage]) {
            return (dictTranslations[labelKey][curtLanguage] || '');
        } else {
            return (labelKey || '');
        }
    };
    // Almacenar el objeto usuario
    req.userLogged = user;
    next();
};