var express = require('express');
var router = express.Router();
var homepagecontroller = require('../controllers/homepagecontroller');

router.get('/',homepagecontroller.homepage);

router.get('/vefpoly', homepagecontroller.vefpoly);

router.get('/dichvuhomepage', homepagecontroller.dichvu);

module.exports = router;

