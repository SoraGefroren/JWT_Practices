const apiController = require('../controllers/apiController');
const express = require('express');
const router = express.Router();
router.use(express.json());

const { protectRoute } = require('../config/auth');

router.get('/', protectRoute, apiController.index);
router.get('/tests', protectRoute, apiController.tests);
router.get('/user-info', protectRoute, apiController.userInfo);
router.get('/list-menu', protectRoute, apiController.listMenus);

module.exports = router;