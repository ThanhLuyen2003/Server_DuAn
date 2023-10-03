var express = require('express');
var router = express.Router();

var salon_api= require('../api/salon.api');

router.get('/salon',salon_api.salon);



module.exports = router;