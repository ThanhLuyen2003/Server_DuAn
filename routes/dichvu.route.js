var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );

var ServiceController = require('../controllers/servicecontroller');

router.get('/', ServiceController.list);


router.get('/add', ServiceController.addService);
router.post('/add',uploader.single('file_anh'), ServiceController.addService);

router.get('/edit/:idse', ServiceController.editService);
router.post('/edit/:idse',uploader.single('file_anh'), ServiceController.editService);

router.get('/delete/:idse', ServiceController.deleteService);
router.post('/delete/:idse', ServiceController.deleteService);

router.get('/sxtenservice', ServiceController.sxTheoTenService);
router.post('/sxtenservice', ServiceController.sxTheoTenService);

router.get('/sxtheogia', ServiceController.sxTheoGia);
router.post('/sxtheogia', ServiceController.sxTheoGia);

module.exports = router;