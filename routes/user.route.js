var express = require('express');
var router = express.Router();
var check_login = require('../middlewares/check_login');
var usercontroller = require('../controllers/usercontroller');

router.get('/',check_login.yeu_cau_dang_nhap ,usercontroller.list);

module.exports = router;