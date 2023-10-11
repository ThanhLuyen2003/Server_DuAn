var express = require('express');
var router = express.Router();

var comment_api= require('../api/Comment.api');

router.get('/comment',comment_api.Comment);

module.exports = router;