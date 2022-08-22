const express = require('express');
const { updateSetting } = require("../middlewares/validations/setting.validation");
const settingController = require('../controllers/setting.controller');
const {isAuth} = require('../middlewares/authentication');

const router = express.Router();

router.get('/setting', [isAuth], settingController.getSetting);
router.post('/setting', [isAuth], settingController.updateSetting);

module.exports = router;