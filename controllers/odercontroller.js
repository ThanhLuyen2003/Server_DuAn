var myMD = require('../models/model');
var fs = require('fs');

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'nameU';
  const sortOrder = req.query.sortOrder || 'asc';

  var thong_bao = null;
  var dieu_kien_loc = null;
  if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
    // Tìm kiếm theo cột 'name'
    dieu_kien_loc = { 
        $or: [
            { nameU: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { phoneU: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { price: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { addressU: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { message: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { addressU: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { idUser: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { status: { $regex: new RegExp(req.query.billSearch, 'i') } }
        ]
    };
  } else {
    thong_bao = "Không có dữ liệu";
  }

  try {
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    var listOders = await myMD.OrderModel.find(dieu_kien_loc).skip(skip).limit(limit).sort(sortOptions);
    var totalOders = await myMD.OrderModel.countDocuments();
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  res.render('oder/oder', {
    listOders: listOders,
    currentPage: page,
    totalPages: Math.ceil(totalOders / limit),
    totalOders
  });
}

exports.duyetSP = async (req, res, next) => {
  console.log('Xác nhận đơn hàng');
  let ids = req.params.ids;

  console.log(ids + 'aaaaaaa');
  let objBill = await myMD.OrderModel.findById(ids);

  console.log('BEFORE' + objBill.status);
  let billStatus = objBill.status;

  if (billStatus === 'Có đơn') {
    objBill.status = 'Đang giao hàng';
  }

  if (billStatus === 'Đang giao hàng') {
    objBill.status = 'Đã giao hàng';
  }

  objBill._id = ids;

  try {
    console.log('AFTER' + objBill.status);
    await myMD.OrderModel.findByIdAndUpdate({ _id: ids }, objBill);
    console.log('AFTER UPDATE' + objBill.status);
  } catch (error) {
    console.log(error);
  }

  res.redirect('/oder');
}
exports.huySP = async (req, res, next) => {
  console.log('Xác nhận đơn hàng');
  let ids = req.params.ids;

  console.log(ids + 'aaaaaaa');
  let objBill = await myMD.OrderModel.findById(ids);

  console.log('BEFORE' + objBill.status);
  let billStatus = objBill.status;

  if (billStatus === 'Có đơn') {
    objBill.status = 'Hủy đơn';
  }

  if (billStatus === 'Đang giao hàng') {
    objBill.status = 'Hủy đơn';
  }

  objBill._id = ids;

  try {
    console.log('AFTER' + objBill.status);
    await myMD.OrderModel.findByIdAndUpdate({ _id: ids }, objBill);
    console.log('AFTER UPDATE' + objBill.status);
  } catch (error) {
    console.log(error);
  }


  res.redirect('/oder');

}

exports.renderPage = async (req, res, next) => {
  try {
    const listOders = await myMD.OrderModel.find();
    res.locals.listOders = listOders;

    res.render('oder/oder');
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};