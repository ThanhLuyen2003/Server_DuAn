var express = require('express');
var router = express.Router();

var users_api = require('../api/ProductSalon.api');

router.get('/productsalon', users_api.productsalon);

module.exports = router;