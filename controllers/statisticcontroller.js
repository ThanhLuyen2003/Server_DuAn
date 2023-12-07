var myMD = require('../models/model');
var fs = require ('fs');


exports.thongkebanhang = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    var dieu_kien_loc = null;
    if (typeof(req.query.hangnhapSearch) !== 'undefined') {
      dieu_kien_loc = { name: { $regex: new RegExp(req.query.hangnhapSearch, 'i') } };
    }
    
    try {
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
      const listSatistic = await myMD.productModel.find(dieu_kien_loc).sort(sortOptions).skip((page - 1) * limit).limit(limit);
      const totalSatistic = await myMD.productModel.countDocuments(dieu_kien_loc);
  
      let total = 0;
      const allListSatistic = await myMD.productModel.find(dieu_kien_loc).sort(sortOptions);
      allListSatistic.forEach((row) => {
        const price = row.pricenhap;
        const slnhap = row.soluongnhap;
        const tongtiennhap = price * slnhap;
        total += tongtiennhap;
      });
  
      const totalPages = Math.ceil(totalSatistic / limit);
  
      res.render('thongke/thongkebanhang', {
        listSatistic: listSatistic,
        currentPage: page,
        totalPages: totalPages,
        totalSatistic: totalSatistic,
        total: total
      });
  
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

exports.editbanhang = async (req, res, next) => {
    let msg = '';
    var listSatistic = await myMD.productModel.find();

    let idp = req.params.idp;
    let objP = await myMD.productModel.findById(idp);
    if (req.method == 'POST') {

        let objP = new myMD.productModel();

        objP.soluongnhap = req.body.soluongnhap;
        objP.name = req.body.name;
        objP.pricenhap = req.body.pricenhap;
        objP.price = req.body.price;
        objP._id = idp;
        try {
            await myMD.productModel.findByIdAndUpdate({ _id: idp }, objP);
            msg = ' Đã sửa';
        } catch (error) {
            msg = ' Error' + error.message;
            console.log(error);
        }
    }
    res.render('thongke/editthongkebanhang', { msg: msg, listSatistic: listSatistic, objP: objP });
}



exports.thongketheolichcat = (req, res, next) => {
    console.log('thống kê theo lịch cắt');
    res.render('thongke/thongketheolichcat');   
}


