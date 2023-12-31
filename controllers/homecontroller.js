var billDB = require('../models/BillModel');
var myMD = require('../models/model');
const moment = require('moment');
const nodemailer = require('nodemailer');

async function sendEmail(bill, user) {
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
      to: 'cauvang0940@gmail.com',
      subject: 'Bạn có 1 lịch cắt tóc mới',
      text: `Khách hàng ${user.name} đã đặt lịch vào lúc ${bill.hour}.`,
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

exports.home = async (req, res, next) => {
  let loc = null;
  // tim kiem
  var thong_bao = null;
  var dieu_kien_loc = {};
  
  if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
    const billSearch = req.query.billSearch.trim();
    dieu_kien_loc = {
      $or: [
        { nameSalon: { $regex: req.query.billSearch.trim(), $options: 'i' } },
        { addressSalon: { $regex: req.query.billSearch.trim(), $options: 'i' } },
        { price: { $regex: req.query.billSearch.trim(), $options: 'i' } },
        { idUser: { $in: await getUserIdByPhoneNumber(req.query.billSearch.trim()) } },
        { idUser: { $in: await getUserIdByName(req.query.billSearch.trim()) } },
      ]
    };
  } else {
    thong_bao = "Không có dữ liệu";
  }
  

  if (typeof req.query.phone !== 'undefined') {
    loc = { phone: req.query.phone };
  }

  const page = parseInt(req.query.page) || 1;
  const limitPerPage = 7;
  const skip = (page - 1) * limitPerPage;

  try {
    let listTime = await myMD.timeModel.find();
    // Lấy danh sách lịch đặt và sắp xếp ngay trong truy vấn
    let listBill = await billDB.find(Object.assign({}, loc, dieu_kien_loc))
      .populate('idUser')
      .sort({ day: 1, hour: 1 });

    // Lấy ngày hiện tại
    const currentDate = moment().format('YYYY-MM-DD');

    // Tách danh sách thành hai phần: ngày hôm nay và các ngày khác
    const todayAppointments = listBill.filter(bill => moment(bill.day).isSame(currentDate, 'day'));
    const otherAppointments = listBill.filter(bill => !moment(bill.day).isSame(currentDate, 'day'));

    // Ghép lại danh sách sao cho ngày hôm nay lên đầu
    listBill = [...todayAppointments, ...otherAppointments];

    // Tính toán trang và số lịch đặt để hiển thị trên trang
    const totalBilla = listBill.length;
    const totalPages = Math.ceil(totalBilla / limitPerPage);
    const currentPage = Math.min(page, totalPages); // Đảm bảo không vượt quá tổng số trang

    // Lấy chỉ mục bắt đầu và kết thúc của danh sách lịch trên trang hiện tại
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;

    // Lấy danh sách lịch đặt của trang hiện tại
    const currentList = listBill.slice(startIndex, endIndex);

    // Lặp qua từng lịch đặt và cập nhật trạng thái
    for (const bill of listBill) {
      if (bill.status !== 'Đã hoàn thành' && bill.status !== 'Khách đang cắt' && bill.status !== 'Đã hủy lịch') {
        const appointmentTime = moment(`${bill.day} ${bill.hour}`, 'YYYY-MM-DD HH:mm');
        const currentTime = moment();
        const minutesDiff = currentTime.diff(appointmentTime, 'minutes');

        // Kiểm tra và cập nhật trạng thái
        if (minutesDiff > 30) {
          bill.status = 'Đã hủy lịch';
        } else if (minutesDiff > 10) {
          bill.status = 'Khách đến muộn';
        }
        // Cập nhật trạng thái vào cơ sở dữ liệu
        await billDB.updateOne({ _id: bill._id }, { $set: { status: bill.status, note: bill.note } });
      }
    }

    const totalBill = await billDB.countDocuments(loc);
    const listU = await myMD.userModel.find();
    const listBills = await billDB.find();

    listBills.forEach(async (row) => {
      if (row.status === 'Sắp tới') {
        // Lấy thông tin người dùng từ listU
        const user = listU.find(u => u._id.toString() === row.idUser.toString());

        // Kiểm tra xem user có tồn tại không
        if (user) {
          // Gọi hàm sendEmail khi có đơn hàng mới
          await sendEmail(row, user);
        }
      }
    });
    res.render('home/danhsach', {
      listBill: currentList,
      listTime: listTime,
      currentPage,
      totalPages,
      totalBill,
      thong_bao: thong_bao
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách lịch đặt:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

exports.xac_nhan_lich_dat = async (req, res, next) => {
  let ids = req.params.ids;
  // console.log(await bill.findById(ids));

  let objBill = await billDB.findById(ids);

  let billStatus = objBill.status;

  if (billStatus === 'Sắp tới') {
    objBill.status = 'Khách đang cắt';
  }

  if (billStatus === 'Khách đến muộn') {
    console.log('before1' + objBill.status);
    objBill.status = 'Khách đang cắt';
    console.log('before2' + objBill.status);
  }

  if (billStatus === 'Khách đang cắt') {
    objBill.status = 'Đã hoàn thành';
  }

  try {
    await billDB.findByIdAndUpdate(ids, objBill);
    console.log('after' + objBill.status);

  } catch (error) {
    console.error('Lỗi khi xác nhận lịch:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }

  res.redirect('/home');
}

exports.huyLich = async (req, res, next) => {
  console.log('Hủy Lịch');
  const ids = req.params.ids;
  try {
    let objBill = await billDB.findById(ids);

    if (!objBill) {
      return res.status(404).json({ error: 'Không tìm thấy đối tượng' });
    }

    console.log(objBill.status);  // Log trạng thái hiện tại

    if (objBill.status === 'Khách đến muộn') {
      objBill.status = 'Đã hủy lịch';
    } else {
      console.log('Trạng thái không phù hợp để hủy lịch');
      return res.status(400).json({ error: 'Trạng thái không phù hợp để hủy lịch' });
    }

    console.log(objBill.status);  // Log trạng thái sau khi cập nhật

    await objBill.save();
    console.log(objBill.status);  // Log trạng thái sau khi cập nhật
    res.redirect('/home');
  } catch (error) {
    console.error('Lỗi khi hủy lịch:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}



exports.addNote = async (req, res, next) => {
  const ids = req.params.ids;
  const newTextNote = req.body.textNote;

  try {
    await billDB.findByIdAndUpdate(ids, { note: newTextNote });
    console.log('Ghi chú đã được cập nhật thành công:', newTextNote);
  } catch (error) {
    console.log('Lỗi khi cập nhật ghi chú:', error);
  }

  res.redirect('/home');
};

exports.homeFilter = async (req, res, next) => {
  console.log('Yêu cầu đến /home/filter_data đã được nhận.');
  const page = parseInt(req.query.page) || 1;
  const limitPerPage = 10;
  const skip = (page - 1) * limitPerPage;

  let loc = {}; // Khai báo biến loc ở đây

  try {
    let listTime = await myMD.timeModel.find();
    let listBill = await billDB.find()
      .populate('idUser')
      .sort({ day: 1, hour: 1 });

    // Lấy dữ liệu từ query parameters thay vì req.body
    const { startDay, endDay, statusSaptoi , statusSuccess, statusInService, statusLate, statusCanceled, startMinute } = req.query;
    console.log(req.query);

    // Xây dựng các điều kiện lọc
    if (startDay) loc.startDate = { $gte: moment(startDay, 'YYYY-MM-DD').startOf('day').utc().toDate() };
    if (endDay) loc.endDate = { $lte: moment(endDay, 'YYYY-MM-DD').endOf('day').utc().toDate() };

    const statusArray = [];
    if (statusSaptoi) statusArray.push('Sắp tới');
    if (statusSuccess) statusArray.push('Đã hoàn thành');
    if (statusInService) statusArray.push('Khách đang cắt');
    if (statusLate) statusArray.push('Khách đến muộn');
    if (statusCanceled) statusArray.push('Đã hủy lịch');
    if (statusArray.length > 0) loc.status = { $in: statusArray };
    if (startMinute) loc.startMinute = startMinute;

    const filteredBills = listBill.filter(bill => {
      const billStatus = bill.status;

      // Chuyển đổi ngày thành đối tượng moment để so sánh
      const billDate = moment(bill.day);

      // So sánh ngày theo khoảng
      const isWithinDateRange = (!startDay || billDate.isSameOrAfter(startDay)) && (!endDay || billDate.isSameOrBefore(endDay));

      // Chuyển đổi loc.startMinute thành cùng kiểu dữ liệu với bill.startMinute
      const locStartMinute = loc.startMinute ? moment(loc.startMinute, 'HH:mm').format('HH:mm') : null;

      return (
        isWithinDateRange &&
        (!loc.status || (Array.isArray(loc.status.$in) && loc.status.$in.includes(billStatus))) &&
        (!locStartMinute || bill.hour === locStartMinute)
      );
    });

    console.log(loc);
    console.log(startDay, endDay);
    console.log(filteredBills);

    // Tính toán trang và số lượng hóa đơn để hiển thị trên trang
    const totalBills = filteredBills.length;
    const totalPages = Math.ceil(totalBills / limitPerPage);
    const currentPage = Math.min(page, totalPages);

    // Lấy chỉ mục bắt đầu và kết thúc của danh sách hóa đơn trên trang hiện tại
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;

    // Lấy danh sách hóa đơn của trang hiện tại
    const currentList = filteredBills.slice(startIndex, endIndex);

    res.render('home/danhsach', {
      listTime: listTime,
      listBill: currentList,
      currentPage,
      totalPages,
      totalBill: totalBills,
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách lịch đặt:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};
async function getUserIdByPhoneNumber(phoneNumber) {
  const user = await myMD.userModel.findOne({ phone: { $regex: phoneNumber, $options: 'i' } });
  return user ? [user._id] : [];
}
async function getUserIdByName(NameUser) {
  const user = await myMD.userModel.findOne({ name: { $regex: NameUser, $options: 'i' } });
  return user ? [user._id] : [];
}