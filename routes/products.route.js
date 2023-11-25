var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );
var check_login = require('../middlewares/check_login');
var productController = require('../controllers/productscontroller');

router.get('/',check_login.yeu_cau_dang_nhap, productController.list);

router.get('/add',check_login.yeu_cau_dang_nhap, productController.addPro);
router.post('/add',check_login.yeu_cau_dang_nhap, uploader.single('file_anh'), productController.addPro);

router.get('/thongke',check_login.yeu_cau_dang_nhap, productController.thongkeproduct);
// router.post('/thongke',check_login.yeu_cau_dang_nhap, productController.thongkeproduct);

router.get('/edit/:idp',check_login.yeu_cau_dang_nhap, productController.editPro);
router.post('/edit/:idp',check_login.yeu_cau_dang_nhap,uploader.single('file_anh'), productController.editPro);

router.get('/delete/:idp',check_login.yeu_cau_dang_nhap, productController.deletePro);
router.post('/delete/:idp',check_login.yeu_cau_dang_nhap, productController.deletePro);

router.get('/sxtheotensp',check_login.yeu_cau_dang_nhap, productController.sxTheoTenSP);
router.post('/sxtheotensp',check_login.yeu_cau_dang_nhap, productController.sxTheoTenSP);

router.get('/sxtheogiasp',check_login.yeu_cau_dang_nhap, productController.sxTheoGiaSP);
router.post('/sxtheogiasp',check_login.yeu_cau_dang_nhap, productController.sxTheoGiaSP);


module.exports = router;