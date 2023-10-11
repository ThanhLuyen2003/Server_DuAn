var express = require('express');
var router = express.Router();

var ServiceController = require('../controllers/servicecontroller');

router.get('/', ServiceController.list);

module.exports = router;