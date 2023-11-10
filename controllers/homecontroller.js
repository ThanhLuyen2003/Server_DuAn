var Bill = require('../models/BillModel');
var fs = require ('fs');
exports.home = async(req,res,next) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'nameSalon';
  const sortOrder = req.query.sortOrder || 'asc';
    try {
        const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        var listBill = await Bill.find().skip(skip).limit(limit).sort(sortOptions).populate('idUser');
        var totalBill = await Bill.countDocuments();
    
      } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    res.render('home/danhsach',{listBill: listBill, currentPage: page,
        totalPages: Math.ceil(totalBill / limit),
        totalBill});
}