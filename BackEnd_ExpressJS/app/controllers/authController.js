const { generateAccessToken, generateRefreshToken, renewAccessToken, verifyRefreshToken } = require('../config/auth');
const LogAccess = require('../models/logAccess');
const LogError = require('../models/logError');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    let extLanguage = null;
    try {
        // Tomar datos y buscar Usuario
        const { username, password, language } = req.body;
        // Reservar el lenguaje externo
        extLanguage = language ?? null;
        // Verificar si el usuario está bloqueado
        const isBlocked = await LogAccess.isBlocked(req.ip, username);
        if (isBlocked) {
            await LogAccess.setBlocked(req.ip, username);
            return res.status(401).json({
                message: res.translate('yourAccessWasBlockedPleaseTryToEnterAgainInAFewMinutes', extLanguage)
            });
        }
        // Buscar usuario
        const user = await User.findOne({
            where: {
                strEmail: username
            }
        });
        if (!user) {
            // Registrar acceso
            let wasBlocked = await LogAccess.registerAccess(false, req.ip, username);
            // Verificar si se ha bloqueado al usuario
            if (wasBlocked) {
                return res.status(401).json({
                    message: res.translate('youHaveExceededTheLimitOfAccessAttempts', extLanguage)
                });
            } else {
                return res.status(401).json({
                    message: res.translate('theUsernameAndOrPasswordIsIncorrect', extLanguage)
                });
            }
        }
        // Comparar la contraseña proporcionada con la contraseña almacenada en la Base de Datos
        const passwordMatch = await bcrypt.compare(password, user.password.replace(/^\$2y(.+)$/i, '$2a$1'));
        if (!passwordMatch) {
            // Registrar acceso
            let wasBlocked = await LogAccess.registerAccess(false, req.ip, username);
            // Verificar si se ha bloqueado al usuario
            if (wasBlocked) {
                return res.status(401).json({
                    message: res.translate('youHaveExceededTheLimitOfAccessAttempts', extLanguage)
                });
            } else {
                return res.status(401).json({
                    message: res.translate('theUsernameAndOrPasswordIsIncorrect', extLanguage)
                });
            }
        }
        // Registrar acceso
        await LogAccess.registerAccess(true, req.ip, username);
        // Generar tokens JWT y enviarlos como respuesta
        const accessToken = generateAccessToken(user.ideUser);
        const refreshToken = generateRefreshToken(user.ideUser);
        const userLanguage = user.strDefaultLanguage ?? extLanguage;
        res.json({
            accessToken,
            refreshToken,
            userLanguage
        });
    } catch (error) {
        // Manejar el error
        console.error(error);
        await LogError.create({
            strAddress: req.ip,
            strAppOrigin: 'authController',
            strParameters: JSON.stringify(req.body || {}),
            strError: error.toString(),
            timeStamp: new Date(),
        });
        res.status(500).send(res.translate('internalServerError', extLanguage));
    }
};

exports.renewAccessToken = async (req, res) => {
    return await renewAccessToken(req, res);
};

exports.verifyRefreshToken = async (req, res) => {
    return await verifyRefreshToken(req, res);
};


