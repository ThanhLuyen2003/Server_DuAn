exports.yeu_cau_dang_nhap =(req, res, next)=>{
    if(req.session.userLogin){
        // có tồn tại session
        res.locals.user = req.session.userLogin || null;
        next();
    }else{
        // không tồn tại thông tin đăng nhập
        // chuyển sang trang đăng nhập
        res.redirect('/settings/login');
    }
}