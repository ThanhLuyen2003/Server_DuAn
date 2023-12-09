var myMD = require('../models/model');
var fs = require('fs');

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'nameU';
  const sortOrder = req.query.sortOrder || 'asc';

  // tìm kiếm
  var thong_bao = null;
  var dieu_kien_loc = {};
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
  
    const listOders = await myMD.OrderModel.aggregate([
      { $match: dieu_kien_loc },
      {
        $addFields: {
          orderPriority: {
            $switch: {
              branches: [
                { case: { $eq: ['$status', 'Sắp tới'] }, then: 3 },
                { case: { $in: ['$status', ['Hủy đơn', 'Đã giao hàng', 'Trả hàng']] }, then: 2 },
              ],
              default: 1
            }
          }
        }
      },
      { $sort: { orderPriority: sortOrder === 'desc' ? -1 : 1, ...sortOptions } },
      { $skip: skip },
      { $limit: limit }
    ]);
  
    const totalOders = await myMD.OrderModel.countDocuments(dieu_kien_loc);
  
    res.render('oder/oder', {
      listOders: listOders,
      currentPage: page,
      totalPages: Math.ceil(totalOders / limit),
      totalOders
    });
  } catch (err) {
    console.error('Error retrieving orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  
  
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
    objBill.status = 'Trả hàng';
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

exports.addNote = async (req, res, next) => {
  const ids = req.params.ids;
  const newTextNote = req.body.textNote;

  try {
    await myMD.OrderModel.findByIdAndUpdate(ids, { note: newTextNote });
    console.log('Ghi chú đã được cập nhật thành công:', newTextNote);
  } catch (error) {
    console.log('Lỗi khi cập nhật ghi chú:', error);
  }

  res.redirect('/oder');
};