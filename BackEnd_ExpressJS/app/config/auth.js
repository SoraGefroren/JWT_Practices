const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { secretKey } = require('./config');
const User = require('../models/user');

// Funciones para generar un token JWT
const generateAccessToken = (userId) => {
    const payload = { userId, type: 'access' };
    const options = { expiresIn: '15m' }; // 15 minutos
    return jwt.sign(payload, secretKey, options);
};

const generateRefreshToken = (userId) => {
    const payload = { userId, type: 'refresh', tokenId: uuidv4() };
    const options = { expiresIn: '30m' }; // 1h, 7d = 7 dias
    return jwt.sign(payload, secretKey, options);
};

// Función para verificar un token JWT
const verifyToken = (token) => {
    try {
        if (token.includes('Bearer ')) {
            // Si está el prefijo "Bearer ", se debe de eliminar
            token = token.replace('Bearer ', '');
        }
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        // El token no es válido
        return null;
    }
};

// Funcion para recuperar el usuario del token
const getTokenUser = async (token, req) => {
    let user = null;
    let tagLanguage = process.env.LANGUAGE;
    token = token ?? req.headers.authorization?.split(' ')[1];
    if (!token) {
        return { user, tagLanguage };
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return { user, tagLanguage };
    }
    user = await User.findOne({
        where: {
            ideUser: decoded.userId
        }
    });
    if (!user) {
        return { user, tagLanguage };
    } else {
        tagLanguage = user.strDefaultLanguage;
    }
    return { user, tagLanguage };
};

// Middleware para proteger una ruta
const protectRoute = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: res.translate('tokenNotProvided') });
    }
    const decoded = verifyToken(token);
    if (!decoded || decoded.type !== 'access') {
        return res.status(401).json({ message: res.translate('invalidToken') });
    }
    // Almacenar el ID de usuario en el objeto req para su posterior uso
    req.userId = decoded.userId;
    next();
};

// Middlewares para renovar el accessToken utilizando el refreshToken
const renewAccessToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: res.translate('tokenNotProvided') });
    }
    const decoded = verifyToken(refreshToken);
    if (!decoded || decoded.type !== 'refresh') {
        return res.status(401).json({ message: res.translate('invalidToken') });
    }
    const user = await User.findOne({
        where: {
            ideUser: decoded.userId
        }
    });
    if (!user) {
        return res.status(401).json({ message: res.translate('invalidUser') });
    }
    try {
        let newRefreshToken = null;
        // Calcular vigencia del refreshToken en segundos
        const currentTimestamp = Math.floor(Date.now() / 1000);
        // Tiempo restante en segundos
        const timeRemaining = decoded.exp - currentTimestamp;
        // Umbral de tiempo para renovar el refreshToken para 5 minutos en segundos
        if (timeRemaining <= (5 * 60)) {
            // Si queda menos o igual tiempo del umbral, generar un nuevo refreshToken
            newRefreshToken = generateRefreshToken(decoded.userId);
        }
        // Emitir un nuevo accessToken
        const accessToken = generateAccessToken(decoded.userId);
        return res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        return res.status(401).json({ message: res.translate('invalidToken') });
    }
};

const verifyRefreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: res.translate('tokenNotProvided') });
    }
    const decoded = verifyToken(refreshToken);
    if (!decoded || decoded.type !== 'refresh') {
        return res.status(401).json({ message: res.translate('invalidToken') });
    }
    const user = await User.findOne({
        where: {
            ideUser: decoded.userId
        }
    });
    if (!user) {
        return res.status(401).json({ message: res.translate('invalidUser') });
    }
    try {
        // Indicar que el refreshToken es válido
        return res.status(200).json({ message: res.translate('validToken') });
    } catch (error) {
        return res.status(401).json({ message: res.translate('invalidToken') });
    }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken, getTokenUser, protectRoute, renewAccessToken, verifyRefreshToken };
