var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homecontroller');
var check_login = require('../middlewares/check_login');


router.get('/',check_login.yeu_cau_dang_nhap,homeController.home);
// router.post('/',check_login.yeu_cau_dang_nhap,homeController.home);
console.log('Before defining route for /home/filter_data');
router.get('/filter_data',check_login.yeu_cau_dang_nhap,homeController.homeFilter);
// phân quyền tạm thời bor
// router.get('/danh-sach-lich-dat',check_login.yeu_cau_dang_nhap,staffController.ds_lich_dat);

router.get('/xac-nhan-lich-dat/:ids', check_login.yeu_cau_dang_nhap,homeController.xac_nhan_lich_dat);


router.post('/add-note/:ids', check_login.yeu_cau_dang_nhap, homeController.addNote);

module.exports = router;
