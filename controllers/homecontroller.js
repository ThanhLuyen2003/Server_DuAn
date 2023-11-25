var billDB = require('../models/BillModel');
var fs = require('fs');
exports.home = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'nameSalon';
  const sortOrder = req.query.sortOrder || 'asc';
  try {
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    var listBill = await billDB.find().skip(skip).limit(limit).sort(sortOptions).populate('idUser');
    var totalBill = await billDB.countDocuments();

  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  res.render('home/danhsach', {
    listBill: listBill, currentPage: page,
    totalPages: Math.ceil(totalBill / limit),
    totalBill
  });
}

exports.xac_nhan_lich_dat = async (req, res, next) => {
  console.log('Xác nhận lịch đặt');
  let ids = req.params.ids;
  // console.log(await bill.findById(ids));
  console.log(ids + 'aaaaaaa');
  let objBill = await billDB.findById(ids);

  console.log('BEFORE' + objBill.status);
  objBill.status = 'Đã hoàn thành';
  objBill._id = ids;

  try {
    console.log('AFTER' + objBill.status);
    await billDB.findByIdAndUpdate({ _id: ids }, objBill);
    console.log('AFTER UPDATE' + objBill.status);
  } catch (error) {
    console.log(error);
  }

  res.redirect('/home');
}