const authController = require('../controllers/authController');
const freeController = require('../controllers/freeController');
const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/', freeController.index);
router.get('/languages', freeController.languages);
router.get('/translations', freeController.translations);
router.get('/translations/:language', freeController.translations);

// Ruta pára iniciar sesión y obtener un accessToken
router.post('/login', authController.login);

// Ruta para proteger y renovar el accessToken utilizando el refreshToken
router.post('/refresh', authController.renewAccessToken);

// Ruta para validar el refreshToken
router.post('/verify-refresh', authController.verifyRefreshToken);

module.exports = router;
