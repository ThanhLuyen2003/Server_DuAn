var myMD = require('../models/model');
var fs = require('fs');

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';

  // tìm kiếm
  var thong_bao = null;
  var dieu_kien_loc = null;
  if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
    dieu_kien_loc = { 
        $or: [
            { name: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { phone: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { email: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { address: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { otp: { $regex: new RegExp(req.query.billSearch, 'i') } },
            { balance: parseFloat(req.query.billSearch) || 0 }
        ]
    };
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