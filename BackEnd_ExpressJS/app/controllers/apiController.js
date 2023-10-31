const ItemMenu = require('../models/itemMenu');
const LogError = require('../models/logError');
const UserType = require('../models/userType');
const Translation = require('../models/translation');
const UserTypeHasItemMenu = require('../models/userTypeHasItemMenu');

exports.index = async (req, res) => {
    if (req.userLogged) {
        res.json({
            message: res.translate('greetings') + ' ' + req.userLogged.strUserName
        });
    } else {
        res.json({
            message: res.translate('greetings')
        });
    }
};

exports.tests = async (req, res) => {
    function getRandomString(minLength, maxLength) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return result;
    }
    function getRandomDate() {
        const startDate = new Date(2000, 0, 1).getTime(); // Año mínimo
        const endDate = new Date().getTime(); // Fecha actual
        const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
        return randomDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }
    function generateRandomList(length) {
        const list = [];
        for (let i = 0; i < length; i++) {
            const item = {
                strNoun: getRandomString(10, 25), // Cambia 12 por la longitud deseada
                datTest: getRandomDate(),
            };
            list.push(item);
        }
        return list;
    }
    res.json({
        list: generateRandomList(100)
    });
};

exports.userInfo = async (req, res) => {
    try {
        if (req.userLogged) {
            res.json({
                message: res.translate('greetings') + ' ' + req.userLogged.strUserName,
                userInfo: {
                    strUserName: req.userLogged.strUserName
                }
            });
        } else {
            res.json({
                message: res.translate('greetings'),
                userInfo: null
            });
        }
    } catch (error) {
        // Manejar el error
        console.error(error);
        await LogError.create({
            strAddress: req.ip,
            strAppOrigin: 'apiController',
            strParameters: JSON.stringify(req.body || {}),
            strError: error.toString(),
            timeStamp: new Date(),
        });
        res.status(500).send(res.translate('internalServerError'));
    }
};

exports.listMenus = async (req, res) => {
    try {
        if (req.userLogged) {
            let listMenus = [];
            if (req.userLogged.ideUserType) {
                const userType = await UserType.findOne({
                    where: {
                        ideUserType: req.userLogged.ideUserType
                    },
                    include: {
                        model: UserTypeHasItemMenu,
                        include: {
                            model: ItemMenu,
                            include: Translation
                        }
                    },
                });
                if (userType && userType.tblUserTypeHasItemMenus) {
                    for (let rowUserTypeHasItemMenus of userType.tblUserTypeHasItemMenus) {
                        let keyName = rowUserTypeHasItemMenus.tblItemMenu.tblTranslation.strLabelKey;
                        listMenus.push({
                            trans: keyName,
                            name: res.translate(keyName),
                            link: rowUserTypeHasItemMenus.tblItemMenu.strLink
                        });
                    }
                }
            }
            res.json({
                message: res.translate('greetings') + ' ' + req.userLogged.strUserName,
                listMenus: listMenus
            });
        } else {
            res.json({
                message: res.translate('greetings'),
                listMenus: []
            });
        }
    } catch (error) {
        // Manejar el error
        console.error(error);
        await LogError.create({
            strAddress: req.ip,
            strAppOrigin: 'apiController',
            strParameters: JSON.stringify(req.body || {}),
            strError: error.toString(),
            timeStamp: new Date(),
        });
        res.status(500).send(res.translate('internalServerError'));
    }
};
