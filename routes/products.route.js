var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );

var ProductController = require('../controllers/productscontroller');

router.get('/', ProductController.list);


router.get('/add', ProductController.addPro);
router.post('/add',uploader.single('file_anh'), ProductController.addPro);

router.get('/edit/:idp', ProductController.editPro);
router.post('/edit/:idp',uploader.single('file_anh'), ProductController.editPro);

router.get('/delete/:idp', ProductController.deletePro);
router.post('/delete/:idp', ProductController.deletePro);

router.get('/sxtheotensp', ProductController.sxTheoTenSP);
router.post('/sxtheotensp', ProductController.sxTheoTenSP);

router.get('/sxtheogiasp', ProductController.sxTheoGiaSP);
router.post('/sxtheogiasp', ProductController.sxTheoGiaSP);


module.exports = router;