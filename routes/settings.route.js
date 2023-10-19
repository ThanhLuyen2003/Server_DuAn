var express = require('express');
var router = express.Router();
var settingController = require('../controllers/settingscontroller');

router.get('/login',settingController.login);
router.post('/login',settingController.login);

router.get('/register',settingController.register);
router.post('/register',settingController.register);


module.exports = router;
