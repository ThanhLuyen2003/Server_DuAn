var fs = require ('fs');
exports.homepage = async (req,res,next) =>{

    res.render('homepage/homepage');
}