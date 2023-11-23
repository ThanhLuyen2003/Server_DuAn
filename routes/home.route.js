var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homecontroller');
// var staffController = require('../controllers/staffController');
var check_login = require('../middlewares/check_login');

// kiểm tra yêu cầu đăng nhập

router.get('/',check_login.yeu_cau_dang_nhap,homeController.home);
router.post('/',check_login.yeu_cau_dang_nhap,homeController.home);

// phân quyền tạm thời bor
// router.get('/danh-sach-lich-dat',check_login.yeu_cau_dang_nhap,staffController.ds_lich_dat);

router.get('/xac-nhan-lich-dat/:ids', check_login.yeu_cau_dang_nhap,homeController.xac_nhan_lich_dat);

module.exports = router;
