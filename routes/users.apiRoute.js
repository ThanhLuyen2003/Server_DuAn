var express = require('express');
var router = express.Router();

var users_api= require('../api/users.api');

router.get('/users',users_api.users);

router.post('/addUser',users_api.addUser);
module.exports = router;