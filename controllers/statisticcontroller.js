var myMD = require('../models/model');
var fs = require ('fs');


exports.thongkebanhang = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
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
              { pricenhap: { $regex: new RegExp(req.query.billSearch, 'i') } }
          ]
      };
    } else {
      thong_bao = "Không có dữ liệu";
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




exports.thongketheolichcat = (req, res, next) => {
    console.log('thống kê theo lịch cắt');
    res.render('thongke/thongketheolichcat');   
}


