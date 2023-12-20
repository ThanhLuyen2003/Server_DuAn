const e = require('express');
var myMD = require ('../models/model');

// exports.ds_lich_dat = async(req,res,next) =>{
//     var msg = '';
//     try {
//         // Lấy thông tin nhân viên từ session
//         const staffInfo = req.session.userLogin;
//         console.log(staffInfo.name);

//         // tìm salon theo id nhân viên
//         const salonInfo = await md.salonModel.findOne({idStaff: staffInfo._id});
//         console.log(salonInfo);

//         const listBill = await Bill.find({nameSalon: salonInfo.name});
//         console.log(listBill);

//         if(listBill.length == 0){
//             msg = 'Lỗi truy vấn';
//         }else{
//             // res.send(listBill);
//             res.render('home/staffScreen', {listBill: listBill, staff_name: staffInfo.name})
//         }
//     } catch (error) {
//         res.send(error);
//     }
// }

exports.list = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';

    var thong_bao = null;
    var dieu_kien_loc = {};
    // tìm kiếm
    if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
        // Tìm kiếm theo tên sản phẩm nếu có
        const billSearch = req.query.billSearch.trim();
        dieu_kien_loc.$or = [
            { name: new RegExp(billSearch, 'i') },
            { que: new RegExp(billSearch, 'i') },
            { kinhnghiem: new RegExp(billSearch, 'i') },
            { sdt: parseInt(billSearch) || 0 },
            { namsinh: parseInt(billSearch) || 0 },
            { luongthang: parseInt(billSearch) || 0 }
        ];
    } else {
        thong_bao = "Không có dữ liệu";
    }
    
    try {
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Tìm kiếm theo điều kiện lọc và áp dụng phân trang, sắp xếp
        const listStaff = await myMD.StaffModel.find(dieu_kien_loc)
            .skip(skip)
            .limit(limit)
            .sort(sortOptions);

        // Đếm tổng số lượng bản ghi (không áp dụng điều kiện lọc)
        const totalimport = await myMD.StaffModel.countDocuments();

        res.render('nhanvien/listNV', {
            listStaff: listStaff,
            currentPage: page,
            totalPages: Math.ceil(totalimport / limit),
            totalimport,
            thong_bao: thong_bao // Truyền thông báo vào template nếu cần
        });
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.add = async (req, res, next) => {
    let msg = '';
    var listStaff = await myMD.StaffModel.find().sort({ name: 1 });
    if (req.method == 'POST') {

        let objP = new myMD.StaffModel();
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objP.img = '/uploads/' + req.file.originalname;
        } catch (error) {
            msg = error.message;
        }
        objP.name = req.body.name;
        objP.sdt = req.body.sdt;
        objP.namsinh = req.body.namsinh;
        objP.que = req.body.que;
        objP.luongthang = req.body.luongthang;
        objP.kinhnghiem = req.body.kinhnghiem;
        objP.chucvu = req.body.chucvu;

        try {
            let new_p = await objP.save();
            console.log(new_p);
            msg = 'Lưu thành công';
        } catch (error) {
            msg = 'Error' + error.message;
            console.log(error);
        }
    }
    res.render('nhanvien/addNV', { msg: msg, listStaff: listStaff });
}

exports.edit = async (req, res, next) => {
    let msg = '';
    var listStaff = await myMD.StaffModel.find();

    let idp = req.params.idp;
    let objP = await myMD.StaffModel.findById(idp);
    if (req.method == 'POST') {

        let objP = new myMD.StaffModel();
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objP.img = '/uploads/' + req.file.originalname;
        } catch (error) {
            msg = error.message;
        }
        objP.name = req.body.name;
        objP.sdt = req.body.sdt;
        objP.namsinh = req.body.namsinh;
        objP.que = req.body.que;
        objP.luongthang = req.body.luongthang;
        objP.kinhnghiem = req.body.kinhnghiem;
        objP.chucvu = req.body.chucvu;
        objP._id = idp;
        try {
            await myMD.StaffModel.findByIdAndUpdate({ _id: idp }, objP);
            msg = ' Đã sửa';
        } catch (error) {
            msg = ' Error' + error.message();
            console.log(error);
        }
    }
    res.render('nhanvien/editNV', { msg: msg, listStaff: listStaff, objP: objP });
}