var myMD = require('../models/model');
var billDB = require ('../models/BillModel');

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';

  // tìm kiếm
  var thong_bao = '';
  var dieu_kien_loc = {};

  if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
    const billSearch = req.query.billSearch.trim();
    dieu_kien_loc.$or = [
      { name: new RegExp(billSearch, 'i') },
      { phone: new RegExp(billSearch, 'i')},
      { email: new RegExp(billSearch, 'i')},
      { address: new RegExp(billSearch, 'i')},
    ];
  } else {
    thong_bao = "Không có dữ liệu";
  }

  try {
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    var listUsers = await myMD.userModel.find(dieu_kien_loc).skip(skip).limit(limit).sort(sortOptions);
    var totalUsers = await myMD.userModel.countDocuments();

  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  res.render('user/user', {
    listUsers: listUsers,
    currentPage: page,
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers
  });
}


exports.detailCustomer = async (req, res, next) => {
  console.log('Chi tiết khách hàng');
  
  let userId = req.params.ids;
  console.log(userId);

  try {
    // Lấy thông tin chi tiết của người dùng
    let userObj = await myMD.userModel.findById(userId);

    // Lấy danh sách các đơn hàng đặt lịch của người dùng
    let userBills = await billDB.find({ idUser: userId }).exec();
    let userOrders = await myMD.OrderModel.find({ phoneU: userObj.phone }).exec();
    
    res.render('user/detail', { userObj: userObj, userBills: userBills, userOrders: userOrders});
    // res.send(userOrders);
  } catch (error) {
    console.error('Lỗi khi xem chi tiết khách hàng:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}