var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );
var check_login = require('../middlewares/check_login');
var importController = require('../controllers/importcontroller');
var staticController = require('../controllers/statisticcontroller');

router.get('/thongkebanhang', check_login.yeu_cau_dang_nhap, staticController.thongkebanhang);

router.get('/thongketheolichcat', check_login.yeu_cau_dang_nhap, staticController.thongketheolichcat);

router.get('/import',check_login.yeu_cau_dang_nhap ,importController.list);
router.post('/import',check_login.yeu_cau_dang_nhap ,importController.list);

router.get('/import/add',check_login.yeu_cau_dang_nhap, importController.add);
router.post('/import/add',check_login.yeu_cau_dang_nhap, uploader.single('file_anh'), importController.add);

router.get('/import/edit/:idp',check_login.yeu_cau_dang_nhap, importController.edit);
router.post('/import/edit/:idp',check_login.yeu_cau_dang_nhap,uploader.single('file_anh'), importController.edit);

router.get('/import/sxtheogia',check_login.yeu_cau_dang_nhap, importController.sxTheoGia);
router.post('/import/sxtheogia',check_login.yeu_cau_dang_nhap, importController.sxTheoGia);

router.get('/import/sxtheosl',check_login.yeu_cau_dang_nhap, importController.sxTheoSluong);
router.post('/import/sxtheosl',check_login.yeu_cau_dang_nhap, importController.sxTheoSluong);

module.exports = router;