var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );
var check_login = require('../middlewares/check_login');
var staffcontroller = require('../controllers/staffController');

router.get('/',check_login.yeu_cau_dang_nhap ,staffcontroller.list);
router.post('/',check_login.yeu_cau_dang_nhap ,staffcontroller.list);

router.get('/add',check_login.yeu_cau_dang_nhap, staffcontroller.add);
router.post('/add',check_login.yeu_cau_dang_nhap, uploader.single('file_anh'), staffcontroller.add);

router.get('/edit/:idp',check_login.yeu_cau_dang_nhap, staffcontroller.edit);
router.post('/edit/:idp',check_login.yeu_cau_dang_nhap,uploader.single('file_anh'), staffcontroller.edit);

// router.get('/sxtheogia',check_login.yeu_cau_dang_nhap, importcontroller.sxTheoGia);
// router.post('/sxtheogia',check_login.yeu_cau_dang_nhap, importcontroller.sxTheoGia);

// router.get('/sxtheosl',check_login.yeu_cau_dang_nhap, importcontroller.sxTheoSluong);
// router.post('/sxtheosl',check_login.yeu_cau_dang_nhap, importcontroller.sxTheoSluong);

module.exports = router;