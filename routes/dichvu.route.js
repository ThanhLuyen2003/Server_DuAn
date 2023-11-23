var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );
var check_login = require('../middlewares/check_login');
var serviceController = require('../controllers/servicecontroller');

router.get('/',check_login.yeu_cau_dang_nhap, serviceController.list);


router.get('/add',check_login.yeu_cau_dang_nhap, serviceController.addService);
router.post('/add',check_login.yeu_cau_dang_nhap,uploader.single('file_anh'), serviceController.addService);

router.get('/edit/:idse',check_login.yeu_cau_dang_nhap, serviceController.editService);
router.post('/edit/:idse',check_login.yeu_cau_dang_nhap,uploader.single('file_anh'), serviceController.editService);

router.get('/delete/:idse',check_login.yeu_cau_dang_nhap, serviceController.deleteService);
router.post('/delete/:idse',check_login.yeu_cau_dang_nhap, serviceController.deleteService);

router.get('/sxtenservice',check_login.yeu_cau_dang_nhap, serviceController.sxTheoTenService);
router.post('/sxtenservice',check_login.yeu_cau_dang_nhap, serviceController.sxTheoTenService);

router.get('/sxtheogia',check_login.yeu_cau_dang_nhap, serviceController.sxTheoGia);
router.post('/sxtheogia',check_login.yeu_cau_dang_nhap, serviceController.sxTheoGia);

module.exports = router;