const e = require('express');
var Bill = require('../models/BillModel');
var md = require ('../models/model');

exports.ds_lich_dat = async(req,res,next) =>{
    var msg = '';
    try {
        // Lấy thông tin nhân viên từ session
        const staffInfo = req.session.userLogin;
        console.log(staffInfo.name);

        // tìm salon theo id nhân viên
        const salonInfo = await md.salonModel.findOne({idStaff: staffInfo._id});
        console.log(salonInfo);

        const listBill = await Bill.find({nameSalon: salonInfo.name});
        console.log(listBill);

        if(listBill.length == 0){
            msg = 'Lỗi truy vấn';
        }else{
            // res.send(listBill);
            res.render('home/staffScreen', {listBill: listBill, staff_name: staffInfo.name})
        }
    } catch (error) {
        res.send(error);
    }
}