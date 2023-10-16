var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer( { dest: './tmp'} );

var SalonController = require('../controllers/saloncontroller');

router.get('/', SalonController.list);


router.get('/add', SalonController.addSalon);
router.post('/add',uploader.single('file_anh'), SalonController.addSalon);

router.get('/edit/:ids', SalonController.editSalon);
router.post('/edit/:ids',uploader.single('file_anh'), SalonController.editSalon);

router.get('/delete/:ids', SalonController.deleteSalon);
router.post('/delete/:ids', SalonController.deleteSalon);

module.exports = router;