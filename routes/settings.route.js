var express = require('express');
var router = express.Router();
var settingController = require('../controllers/settingscontroller');
var check_login = require('../middlewares/check_login');

router.get('/login',settingController.login);
router.post('/login',settingController.login);

router.get('/register',settingController.register);
router.post('/register',settingController.register);

router.get('/dang-xuat', check_login.yeu_cau_dang_nhap, (req, res) => {
    // Xóa session
    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi khi đăng xuất:', err);
            return res.status(500).send('Lỗi Server Nội bộ');
        }

        // Điều hướng về màn hình homepage
        res.redirect('/');
    });
});


module.exports = router;
