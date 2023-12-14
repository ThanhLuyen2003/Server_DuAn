var myMD = require('../models/model');
var fs = require('fs');

exports.list = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    var thong_bao = null;
    var dieu_kien_loc = {};

    if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
        // Chỉ áp dụng biểu thức chính quy cho trường 'name'
        dieu_kien_loc.name = new RegExp(req.query.billSearch.trim(), 'i');
    } else {
        thong_bao = "Không có dữ liệu";
    }
    

    try {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Tìm kiếm theo điều kiện lọc và áp dụng phân trang, sắp xếp
        const listimport = await myMD.ImportModel.find(dieu_kien_loc)
            .skip(skip)
            .limit(limit)
            .sort(sortOptions);

        // Đếm tổng số lượng bản ghi (không áp dụng điều kiện lọc)
        const totalimport = await myMD.ImportModel.countDocuments();

        res.render('import/import', {
            listimport: listimport,
            currentPage: page,
            totalPages: Math.ceil(totalimport / limit),
            totalimport,
            thong_bao: thong_bao // Truyền thông báo vào template nếu cần
        });
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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

exports.sxTheoGia = async (req, res, next) => {
    const sortBy = req.query.sortBy || 'price';
    const sortOrder = req.query.sortOrder || 'asc';

    try {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const listimport = await myMD.ImportModel.find()
            .sort(sortOptions)
            .lean()
            .exec();

        res.render('import/import', { listimport: listimport });
    } catch (err) {
        console.error('Error retrieving services:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.sxTheoSluong = async (req, res, next) => {
    const sortBy = req.query.sortBy || 'soluongnhap';
    const sortOrder = req.query.sortOrder || 'asc';

    try {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const listimport = await myMD.ImportModel.find()
            .sort(sortOptions)
            .lean()
            .exec();

        res.render('import/import', { listimport: listimport });
    } catch (err) {
        console.error('Error retrieving services:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
