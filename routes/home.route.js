var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homecontroller');
var check_login = require('../middlewares/check_login');

router.get('/hom',check_login.yeu_cau_dang_nhap,homeController.home);
router.post('/hom',check_login.yeu_cau_dang_nhap,homeController.home);

module.exports = router;
