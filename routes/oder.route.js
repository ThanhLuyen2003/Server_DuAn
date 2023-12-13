var express = require('express');
var router = express.Router();
var check_login = require('../middlewares/check_login');
var oderController = require('../controllers/odercontroller');

router.get('/',check_login.yeu_cau_dang_nhap, oderController.list);

console.log('Before defining route for /oder/filter_data');
router.get('/filter_data',check_login.yeu_cau_dang_nhap,oderController.OderFilter);

router.get('/duyetoders/:ids', check_login.yeu_cau_dang_nhap, oderController.duyetSP);

router.post('/add-note/:ids', check_login.yeu_cau_dang_nhap, oderController.addNote);

router.get('/huyoders/:ids', check_login.yeu_cau_dang_nhap, oderController.huySP);

module.exports = router;