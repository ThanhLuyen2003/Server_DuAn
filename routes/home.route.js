var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homecontroller');
var billController = require('../controllers/lichdatcontroller');
var check_login = require('../middlewares/check_login');


router.get('/',check_login.yeu_cau_dang_nhap,homeController.home);
// router.post('/',check_login.yeu_cau_dang_nhap,homeController.home);
console.log('Before defining route for /home/filter_data');
router.get('/filter-data',check_login.yeu_cau_dang_nhap,homeController.homeFilter);

// phân quyền tạm thời bor
// router.get('/danh-sach-lich-dat',check_login.yeu_cau_dang_nhap,staffController.ds_lich_dat);

router.get('/xac-nhan-lich-dat/:ids', check_login.yeu_cau_dang_nhap,homeController.xac_nhan_lich_dat);
router.get('/huy-lich/:ids', check_login.yeu_cau_dang_nhap,homeController.huyLich);

router.post('/add-note/:ids', check_login.yeu_cau_dang_nhap, homeController.addNote);

router.get('/add-bill',check_login.yeu_cau_dang_nhap, billController.addBill);
router.post('/add-bill',check_login.yeu_cau_dang_nhap, billController.addBill);

router.get('/edit-bill/:ids',check_login.yeu_cau_dang_nhap, billController.editBill);
router.post('/edit-bill/:ids',check_login.yeu_cau_dang_nhap, billController.editBill);

module.exports = router;
