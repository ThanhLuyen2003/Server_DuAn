var express = require('express');
var router = express.Router();

var SalonController = require('../controllers/saloncontroller');

router.get('/', SalonController.list);

module.exports = router;