var myMD = require('../models/model');
var fs = require('fs');
const moment = require('moment');
const nodemailer = require('nodemailer');

async function sendEmail(order, user) {
  try {
    // Cấu hình transporter (sử dụng SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hungntph26261@fpt.edu.vn',
        pass: 'tmnm oksz jhzr ymds',
      },
    });

    // Cấu hình nội dung email
    const mailOptions = {
      from: 'hungntph2626@fpt.edu.vn',
      to: 'ducdung0107@gmail.com',
      subject: 'Bạn có 1 đơn hàng mới',
      text: `Khách hàng ${user.name} đã đặt hàng vào lúc ${order.time}.`,
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

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


  // sắp xếp trạng thái
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
                { case: { $in: ['$status', ['Hủy đơn', 'Đã giao hàng']] }, then: 2 },
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
    const listU = await myMD.userModel.find();

    listOders.forEach(async (row) => {
      if (row.status === 'Có đơn') {
        // Lấy thông tin người dùng từ listU
        const user = listU.find(u => u._id.toString() === row.idUser.toString());

        // Kiểm tra xem user có tồn tại không
        if (user) {
          // Gọi hàm sendEmail khi có đơn hàng mới
          await sendEmail(row, user);
        }
      }
    });

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

  //guim ail
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

// bộ lọc
exports.OderFilter = async (req, res, next) => {
  console.log('Request to /oder/filter_data received.');
  const page = parseInt(req.query.page) || 1;
  const limitPerPage = 10;
  const skip = (page - 1) * limitPerPage;

  try {
    let listOders = await myMD.OrderModel.find();

    // Lấy dữ liệu từ query parameters thay vì req.body
    const { startDay, endDay, statusSuccess, statusInService, statusOrder, statusCanceled } = req.query;
    console.log(req.query);

    // Xây dựng các điều kiện lọc
    const loc = {};
    if (startDay) loc.startDate = { $gte: moment(startDay, 'YYYY-MM-DD').startOf('day').utc().toDate() };
    if (endDay) loc.endDate = { $lte: moment(endDay, 'YYYY-MM-DD').endOf('day').utc().toDate() };

    const statusArray = [];
    if (statusSuccess) statusArray.push('Đã giao hàng');
    if (statusInService) statusArray.push('Đang giao hàng');
    if (statusOrder) statusArray.push('Có đơn');
    if (statusCanceled) statusArray.push('Hủy đơn');
    if (statusArray.length > 0) loc.status = { $in: statusArray };

    // Lọc danh sách hóa đơn dựa trên điều kiện
    const filteredOder = listOders.filter(oder => {
      const oderStatus = oder.status;

      // Chuyển đổi ngày thành đối tượng moment để so sánh
      const oderDate = moment(oder.day);

      // So sánh ngày theo khoảng
      const isWithinDateRange = (!startDay || oderDate.isSameOrAfter(startDay)) && (!endDay || oderDate.isSameOrBefore(endDay));

      return isWithinDateRange && (!loc.status || (Array.isArray(loc.status.$in) && loc.status.$in.includes(oderStatus)));
    });


    console.log(loc);
    console.log(startDay, endDay);
    console.log(filteredOder);

    // Tính toán trang và số lượng hóa đơn để hiển thị trên trang
    const totalOders = filteredOder.length;
    const totalPages = Math.ceil(totalOders / limitPerPage);
    const currentPage = Math.min(page, totalPages);

    // Lấy chỉ mục bắt đầu và kết thúc của danh sách hóa đơn trên trang hiện tại
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;

    // Lấy danh sách hóa đơn của trang hiện tại
    const currentList = filteredOder.slice(startIndex, endIndex);

    res.render('oder/oder', {
      listOders: currentList,
      currentPage,
      totalPages,
      totalOders: totalOders,
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách lịch đặt:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};