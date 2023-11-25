exports.thongkebanhang = (req, res, next) => {
    console.log('thống kê bán hàng');
    res.render('thongke/thongkebanhang');   
}


exports.thongketheolichcat = (req, res, next) => {
    console.log('thống kê theo lịch cắt');
    res.render('thongke/thongketheolichcat');   
}

