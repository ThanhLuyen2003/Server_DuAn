var md = require('../models/model');
exports.login = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        // lấy thông tin dựa vào email
        try {
            let objU = await md.AdminModel.findOne({ username: req.body.username });
            if (objU) {
                // Nếu là admin, chuyển hướng đến màn hình danh sách
                if(objU.pass == req.body.pass){
                    req.session.userLogin = objU;
                    // console.log('aaaaaaaaaaaa' + user);
                    //chuyển sang màn hình chính or danh sách
                    return res.redirect('/statistic/thongketheolichcat');
                }else{
                    msg = 'Vui lòng kiểm tra lại mật khẩu !!!'
                }

                // phân quyền tạm thời bỏ
            // } else if (objStaff) {
            //     // Nếu là nhân viên, chuyển hướng đến màn hình danh sách lịch đặt
            //     if(objStaff.pass == req.body.pass){
            //         req.session.userLogin = objStaff;
            //         return res.redirect('/home/danh-sach-lich-dat');
            //       }else{
            //           msg = 'Vui lòng kiểm tra lại mật khẩu !!!'
            //       }
            } else {
                // Nếu không tìm thấy tài khoản nào
                msg = 'Không tồn tại tài khoản này: ' + req.body.username;
            }
        } catch (error) {
            msg = error;
        }
    }
    res.render('settings/login', { msg: msg });
}

exports.register = (req, res, next) => {
    res.render('settings/register');
}