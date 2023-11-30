var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );
var check_login = require('../middlewares/check_login');
var importcontroller = require('../controllers/importcontroller');

router.get('/',check_login.yeu_cau_dang_nhap ,importcontroller.list);
router.post('/',check_login.yeu_cau_dang_nhap ,importcontroller.list);

router.get('/add',check_login.yeu_cau_dang_nhap, importcontroller.add);
router.post('/add',check_login.yeu_cau_dang_nhap, uploader.single('file_anh'), importcontroller.add);

router.get('/edit/:idp',check_login.yeu_cau_dang_nhap, importcontroller.edit);
router.post('/edit/:idp',check_login.yeu_cau_dang_nhap,uploader.single('file_anh'), importcontroller.edit);

router.get('/delete/:idp',check_login.yeu_cau_dang_nhap, importcontroller.delete);
router.post('/delete/:idp',check_login.yeu_cau_dang_nhap, importcontroller.delete);

module.exports = router;