var express = require('express');
var router = express.Router();
var serviceController = require('../api/Service.api');

router.get('/service', serviceController.serviceApi);

module.exports = router;
