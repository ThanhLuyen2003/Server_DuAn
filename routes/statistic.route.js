var express = require('express');
var router = express.Router();
var check_login = require('../middlewares/check_login');

var staticController = require('../controllers/statisticcontroller');

router.get('/thongkebanhang', check_login.yeu_cau_dang_nhap, staticController.thongkebanhang);
router.post('/thongkebanhang', check_login.yeu_cau_dang_nhap, staticController.thongkebanhang);

router.get('/edit/:idp', check_login.yeu_cau_dang_nhap, staticController.editbanhang);
router.post('/edit/:idp', check_login.yeu_cau_dang_nhap, staticController.editbanhang);

router.get('/thongketheolichcat', check_login.yeu_cau_dang_nhap, staticController.thongketheolichcat);

module.exports = router;