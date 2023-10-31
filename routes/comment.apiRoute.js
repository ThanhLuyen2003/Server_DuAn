var express = require('express');
var router = express.Router();

var comment_api= require('../api/Comment.api');


router.get('/getComment/:idPosts', comment_api.getComment);


router.post('/addComment/:idUser/:idPosts',comment_api.addComment);

module.exports = router;