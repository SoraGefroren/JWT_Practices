const { getDictionary } = require('./keeperController');
const Translation = require('../models/translation');
const Language = require('../models/language');

exports.index = async (req, res) => {
    res.json({
        message: res.translate('greetings')
    });
};

exports.languages = async (req, res) => {
    let extLanguage = null;
    try {
        // Recuperar parametros
        const { language } = req.body;
        extLanguage = language ?? null;
        // Recuperar idiomas
        let listLangs = [];
        const languages = await Language.findAll({
            include: Translation,
        });
        if (languages) {
            for (let lang of languages) {
                let keyName = lang.tblTranslation.strLabelKey;
                listLangs.push({
                    trans: keyName,
                    lang: lang.ideLanguage,
                    language: res.translate(keyName, extLanguage)
                });
            }
        }
        res.json({
            languages: listLangs
        });
    } catch (error) {
        // Manejar el error
        console.error(error);
        await LogError.create({
            strAddress: req.ip,
            strAppOrigin: 'freeController',
            strParameters: JSON.stringify(req.body || {}),
            strError: error.toString(),
            timeStamp: new Date(),
        });
        res.status(500).send(res.translate('internalServerError', extLanguage));
    }
};

exports.translations = async (req, res) => {
    const translations = await getDictionary();
    const language = req.params?.language ?? null;
    if (translations) {
        let translationObject = {};
        if (!language) {
            translationObject = translations;
        } else {
            for (const key in translations) {
                if (translations.hasOwnProperty(key) && translations[key][language]) {
                    translationObject[key] = translations[key][language] || '';
                }
            }
        }
        res.json({
            translations: translationObject
        });
    } else {
        res.json({
            translations: null
        });
    }
};