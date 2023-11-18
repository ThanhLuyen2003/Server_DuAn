var express = require('express');
var router = express.Router();
var homepageController = require('../controllers/homepagecontroller');

// var check_login = require('../middlewares/check_login');

router.get('/',homepageController.homepage);
// router.post('/',homepageController.homepage);

module.exports = router;
