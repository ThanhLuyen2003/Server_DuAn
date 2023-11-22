var express = require('express');
var router = express.Router();

var users_api= require('../api/users.api');

router.get('/users',users_api.users);

router.put('/updateUsers/:id', users_api.updateUser); // Route to update a user by ID

router.put('/updateAvatar/:id', users_api.updateAvatar); // Route to update a user by ID

router.put('/updateOTP/:id',users_api.OTPGiaoDich);

router.delete('/deleteUser/:id', users_api.deleteUser);



router.put('/depositMoney/:id', users_api.depositMoney);
module.exports = router;