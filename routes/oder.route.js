var express = require('express');
var router = express.Router();
var check_login = require('../middlewares/check_login');
var oderController = require('../controllers/odercontroller');

router.get('/',check_login.yeu_cau_dang_nhap, oderController.list);

router.get('/duyetoders/:ids', check_login.yeu_cau_dang_nhap, oderController.duyetSP);

module.exports = router;