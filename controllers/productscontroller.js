var myMD = require('../models/model');
var fs = require ('fs');
exports.list = async (req,res,next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    try {
        var listProducts = await myMD.productModel.find().skip(skip).limit(limit);
        var totalProducts = await myMD.productModel.countDocuments();
    
      } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    res.render('product/list',{listProducts: listProducts, currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts});
}
exports.addPro = async(req,res,next) => {
    let msg ='';
     var listProducts = await myMD.productModel.find().sort({name:1});
    if(req.method =='POST'){
       
        let objP = new myMD.productModel();
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objP.avatar = '/uploads/'+ req.file.originalname;
            } catch (error) {
            msg = error.message;
            }
        objP.name = req.body.name;
        objP.trademark = req.body.trademark;
        objP.price = req.body.price;
        objP.describe = req.body.describe;
        objP.ingredient = req.body.ingredient;
        objP.type = req.body.type;
        
        try{
            let new_p = await objP.save();
            console.log(new_p);
            msg = 'Lưu thành công';
        } catch(error){
            msg = 'Error'+ error.message();
            console.log(error);
        }
    }
    res.render('product/add',{msg:msg, listProducts: listProducts});
}
exports.editPro = async(req,res,next) => {
    let msg ='';
     var listProducts = await myMD.productModel.find();

     let idp = req.params.idp;
    let objP = await myMD.productModel.findById(idp);
    if(req.method =='POST'){
       
        let objP = new myMD.productModel();
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objP.avatar = '/uploads/'+ req.file.originalname;
            } catch (error) {
            msg = error.message;
            }
        objP.name = req.body.name;
        objP.trademark = req.body.trademark;
        objP.price = req.body.price;
        objP.describe = req.body.describe;
        objP.ingredient = req.body.ingredient;
        objP.type = req.body.type;
        objP._id = idp;
        try{
            await myMD.productModel.findByIdAndUpdate({_id: idp}, objP );
            msg = 'đã sửa';
        } catch(error){
            msg = 'Error'+ error.message();
            console.log(error);
        }
    }
    res.render('product/edit',{msg:msg, listProducts: listProducts, objP:objP});
}
exports.deletePro =async (req,res,next) =>{
    let idp=req.params.idp;
    try {
       await myMD.productModel.findByIdAndDelete({_id:idp}); 
    } catch (error) {
        
    }
    res.redirect('/product');
}
exports.sxTheoTenSP = async (req,res,next) =>{
    var listProducts = await myMD.productModel.find().sort({name :1});
    res.render('product/list',{listProducts: listProducts})
}
exports.sxTheoGiaSP = async (req,res,next) =>{
    var listProducts = await myMD.productModel.find().sort({price :1});
    res.render('product/list',{listProducts: listProducts})
}