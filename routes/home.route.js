var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homecontroller');

router.get('/',homeController.home);

module.exports = router;
