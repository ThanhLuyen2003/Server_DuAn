var express = require('express');
var router = express.Router();
var homepagecontroller = require('../controllers/homepagecontroller');

router.get('/',homepagecontroller.homepage);

module.exports = router;

