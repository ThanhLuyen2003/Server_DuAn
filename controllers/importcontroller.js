var myMD = require('../models/model');
var fs = require('fs');

exports.list = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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
                { soluongnhap: { $regex: new RegExp(req.query.billSearch, 'i') } },
                { price: { $regex: new RegExp(req.query.billSearch, 'i') } }
            ]
        };
    } else {
        thong_bao = "Không có dữ liệu";
    }

    try {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        var listimport = await myMD.ImportModel.find(dieu_kien_loc).skip(skip).limit(limit).sort(sortOptions);
        var totalimport = await myMD.ImportModel.countDocuments();

    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    res.render('import/import', {
        listimport: listimport, currentPage: page,
        totalPages: Math.ceil(totalimport / limit),
        totalimport
    });
}

exports.add = async (req, res, next) => {
    let msg = '';
    var listimport = await myMD.ImportModel.find().sort({ name: 1 });
    if (req.method == 'POST') {

        let objP = new myMD.ImportModel();
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objP.img = '/uploads/' + req.file.originalname;
        } catch (error) {
            msg = error.message;
        }
        objP.soluongnhap = req.body.soluongnhap;
        objP.name = req.body.name;
        objP.price = req.body.price;

        try {
            let new_p = await objP.save();
            console.log(new_p);
            msg = 'Lưu thành công';
        } catch (error) {
            msg = 'Error' + error.message;
            console.log(error);
        }
    }
    res.render('import/add', { msg: msg, listimport: listimport });
}

exports.edit = async (req, res, next) => {
    let msg = '';
    var listimport = await myMD.ImportModel.find();

    let idp = req.params.idp;
    let objP = await myMD.ImportModel.findById(idp);
    if (req.method == 'POST') {

        let objP = new myMD.ImportModel();
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objP.img = '/uploads/' + req.file.originalname;
        } catch (error) {
            msg = error.message;
        }
        objP.soluongnhap = req.body.soluongnhap;
        objP.name = req.body.name;
        objP.price = req.body.price;
        objP._id = idp;
        try {
            await myMD.ImportModel.findByIdAndUpdate({ _id: idp }, objP);
            msg = ' Đã sửa';
        } catch (error) {
            msg = ' Error' + error.message();
            console.log(error);
        }
    }
    res.render('import/edit', { msg: msg, listimport: listimport, objP: objP });
}

exports.delete = async (req, res, next) => {
    let idp = req.params.idp;
    try {
        await myMD.ImportModel.findByIdAndDelete({ _id: idp });
    } catch (error) {

    }
    res.redirect('/import');
}
