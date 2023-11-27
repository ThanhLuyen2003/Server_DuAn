var billDB = require('../models/BillModel');
var fs = require('fs');
const moment = require('moment');

exports.home = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    // Lấy danh sách lịch đặt và sắp xếp theo ngày và giờ
    let listBill = await billDB.find().sort({ day: 1, hour: 1 }).skip(skip).limit(limit).populate('idUser');

    // Lấy ngày hiện tại
    const currentDate = moment().format('YYYY-MM-DD');

    // Tách danh sách thành hai phần: ngày hôm nay và các ngày khác
    const todayAppointments = [];
    const otherAppointments = [];

    listBill.forEach((bill) => {
      if (moment(bill.day).isSame(currentDate, 'day')) {
        todayAppointments.push(bill);
      } else {
        otherAppointments.push(bill);
      }
    });

    // Ghép lại danh sách sao cho ngày hôm nay lên đầu
    listBill = [...todayAppointments, ...otherAppointments];

    // Lặp qua từng lịch đặt và cập nhật trạng thái
    for (const bill of listBill) {
      if (bill.status !== 'Đã hoàn thành' && bill.status !== 'khách đang cắt') {
        const appointmentTime = moment(`${bill.day} ${bill.hour}`, 'YYYY-MM-DD HH:mm');
        const currentTime = moment();
        const minutesDiff = currentTime.diff(appointmentTime, 'minutes');

        // Kiểm tra và cập nhật trạng thái
        if (minutesDiff > 30) {
          bill.status = 'Đã hủy lịch';
        } else if (minutesDiff > 10) {
          bill.status = 'Khách đến muộn';
        }
      }
    }

    const totalBill = await billDB.countDocuments();

    res.render('home/danhsach', {
      listBill,
      currentPage: page,
      totalPages: Math.ceil(totalBill / limit),
      totalBill,
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách lịch đặt:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};




exports.xac_nhan_lich_dat = async (req, res, next) => {
  console.log('Xác nhận lịch đặt');
  let ids = req.params.ids;
  // console.log(await bill.findById(ids));
  console.log(ids + 'aaaaaaa');
  let objBill = await billDB.findById(ids);

  console.log('BEFORE' + objBill.status);
  let billStatus = objBill.status;

  if (billStatus === 'Sắp tới') {
    objBill.status = 'Khách đang cắt';
  }

  if (billStatus === 'Khách đang cắt') {
    objBill.status = 'Đã hoàn thành';
  }

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