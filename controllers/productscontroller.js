var myMD = require('../models/model');
var productModel = require('../models/model');
var fs = require('fs');
const mongoose = require('mongoose');

exports.list = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';

    // tìm kiếm
    var thong_bao = null;
    var dieu_kien_loc = null;
    if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
        // Tìm kiếm theo cột 'name'
        dieu_kien_loc = {
            $or: [
                { name: { $regex: new RegExp(req.query.billSearch, 'i') } },
                { soluongnhap: parseFloat(req.query.billSearch) || 0 },
                { price: { $regex: new RegExp(req.query.billSearch, 'i') } },
                { trademark: { $regex: new RegExp(req.query.billSearch, 'i') } },
                { pricenhap: { $regex: new RegExp(req.query.billSearch, 'i') } },
                { describe: { $regex: new RegExp(req.query.billSearch, 'i') } },
                { ingredient: { $regex: new RegExp(req.query.billSearch, 'i') } },
                { type: { $regex: new RegExp(req.query.billSearch, 'i') } }
            ]
        };
    } else {
        thong_bao = "Không có dữ liệu";
    }

    console.log("Search Parameter:", req.query.productsp222);
    console.log("Filter Condition:", dieu_kien_loc);

    try {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        var listProducts = await myMD.productModel.find(dieu_kien_loc).skip(skip).limit(limit).sort(sortOptions);
        var totalProducts = await myMD.productModel.countDocuments();
    } catch (err) {
        console.error('Error retrieving users:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    // Hiển thị dữ liệu nếu có
    res.render('product/list', {
        listProducts: listProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts
    });
}

exports.addPro = async (req, res, next) => {
    let msg = '';
    var listProducts = await myMD.productModel.find().sort({ name: 1 });
    if (req.method == 'POST') {
        let objP = new myMD.productModel();

      try {
        const uploadedFilePath = './public/uploads/' + req.file.originalname;
        fs.renameSync(req.file.path, uploadedFilePath);
        
        const domain = '192.168.1.7'; // Thay thế bằng địa chỉ domain thực tế của bạn
        const imageUrl = domain + '/uploads/' + req.file.originalname;
    
        msg = 'Url ảnh: ' + imageUrl;
        objP.avatar = imageUrl;
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

        try {
            let new_p = await objP.save();
            console.log(new_p);
            msg = 'Lưu thành công';
        } catch (error) {
            msg = 'Error: ' + error.message;
            console.log(error);
        }
    }
    res.render('product/add', { msg: msg, listProducts: listProducts });
};

exports.editPro = async (req, res, next) => {
    let msg = '';
    var listProducts = await myMD.productModel.find();

    let idp = req.params.idp;
    let objP = await myMD.productModel.findById(idp);
    if (req.method == 'POST') {

        let objP = new myMD.productModel();
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objP.avatar = '/uploads/' + req.file.originalname;
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
        try {
            await myMD.productModel.findByIdAndUpdate({ _id: idp }, objP);
            msg = ' Đã sửa';
        } catch (error) {
            msg = ' Error' + error.message;
            console.log(error);
        }
    }
    res.render('product/edit', { msg: msg, listProducts: listProducts, objP: objP });
}

exports.deletePro = async (req, res, next) => {
    let idp = req.params.idp;
    try {
        await myMD.productModel.findByIdAndDelete({ _id: idp });
    } catch (error) {

    }
    res.redirect('/product');
}

exports.sxTheoTenSP = async (req, res, next) => {
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
    res.render('product/list', {
        listProducts: listProducts, currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts
    })
}

exports.sxTheoGiaSP = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'price';
    const sortOrder = req.query.sortOrder || 'asc';

    try {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const listProducts = await myMD.productModel.find().skip(skip).limit(limit).sort(sortOptions);
        const totalProducts = await myMD.productModel.countDocuments();

        res.render('product/list', {
            listProducts: listProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });
    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.renderPage = async (req, res, next) => {
    try {
        const listProducts = await myMD.productModel.find();
        const listOders = await myMD.OrderModel.find();
        //   const listOders = res.locals.listOders;

        res.render('product/list', { listProducts, listOders });
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};