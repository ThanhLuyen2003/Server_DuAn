var express = require('express');
var router = express.Router();

var time_api = require('../api/time.api');

router.get('/time', time_api.time);

module.exports = router;