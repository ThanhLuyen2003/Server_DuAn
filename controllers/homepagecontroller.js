var fs = require ('fs');

exports.homepage = async (req,res,next) =>{
    res.render('homepage/homepage');
}

exports.vefpoly = async (req,res,next) =>{
    res.render('homepage/veFpoly');
}

exports.dichvu = async (req,res,next) =>{
    res.render('homepage/dichvu');
}