var myMD = require('../models/model');
var fs = require('fs');

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';

  var dieu_kien_loc = null;
  if (typeof (req.query.userSearch) !== 'undefined') {
    dieu_kien_loc = { name: { $regex: new RegExp(req.query.userSearch, 'i') } };
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