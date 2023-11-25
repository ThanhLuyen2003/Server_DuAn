var myMD = require('../models/model');
var fs = require ('fs');
const mongoose = require('mongoose');
exports.list = async (req,res,next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    try {
        const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        var listProducts = await myMD.productModel.find().skip(skip).limit(limit).sort(sortOptions);
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
        objP.soluongnhap = req.body.soluongnhap;
        objP.name = req.body.name;
        objP.trademark = req.body.trademark;
        objP.pricenhap = req.body.pricenhap;
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
        objP.soluongnhap = req.body.soluongnhap;
        objP.name = req.body.name;
        objP.trademark = req.body.trademark;
        objP.pricenhap = req.body.pricenhap;
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
    try {
        const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        var listProducts = await myMD.productModel.find().skip(skip).limit(limit).sort(sortOptions);
        var totalProducts = await myMD.productModel.countDocuments();
      } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
      }  
  res.render('product/list',{listProducts: listProducts,currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts})
}

exports.sxTheoGiaSP = async (req,res,next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'price';
    const sortOrder = req.query.sortOrder || 'asc';
    try {
        const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        var listProducts = await myMD.productModel.find().skip(skip).limit(limit).sort(sortOptions);
        var totalProducts = await myMD.productModel.countDocuments();
    
      } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    res.render('product/list',{listProducts: listProducts,currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts})
}

exports.thongkeproduct = async (req,res,next) => {
    // try {
    //   await mongoose.connect('mongodb://localhost:27017/DuAnTotNghiep', { useNewUrlParser: true, useUnifiedTopology: true });
  
    //   const ProductModel = new mongoose.Schema({
    //     pricenhap: Number,
    //     price: Number
    //   });
  
    //   const ProductSalon = mongoose.model('ProductSalon', ProductModel);
  
    //   const result = await ProductSalon.aggregate([
    //     {
    //       $group: {
    //         _id: null,
    //         totalXuat: { $sum: '$pricenhap' },
    //         totalNhap: { $sum: '$price' }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         tongGiaTri: { $subtract: ['$totalXuat', '$totalNhap'] }
    //       }
    //     }
    //   ]).exec();
  
    //   const renderedHtml = ejs.render(fs.readFileSync('result.ejs', 'utf8'), { tongGiaTri: result[0].tongGiaTri });
    //   console.log(renderedHtml);
  
    //   mongoose.disconnect();
  
    res.render('product/thongkeproduct');
    // } catch (err) {
    //   console.log(err);
    //   next(err);
    // }
  }