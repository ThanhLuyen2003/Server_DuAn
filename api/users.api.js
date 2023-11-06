var md = require('../models/model');

exports.users = async (req, res, next) => {
    try {
        let id = await md.userModel.find();

        if (users) {
            res.status(200).json(users);
        } else {
            res.status(204).json({
                msg: 'khong co du lieu',

            });
        }
    } catch (err) {
        return res.status(err.status).json({
            msg: err.massage
        });
    }
}



exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedUserInfo = req.body;
        const updatedUser = await md.userModel.findByIdAndUpdate(userId, updatedUserInfo, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(400).json({ msg: 'user not foud' });
        }
    } catch (error) {
        return res.status(500).json({
            msg: err.message
        });
    }
}
exports.OTPGiaoDich = async (req, res, next) => {
    const phoneNumber = req.body.phone; // Số điện thoại từ phía client
    const newOTP = generateNewOTP(); // Tạo mã OTP mới
    try {
        // Tìm người dùng dựa trên ID
        const user = await UserModel.findById(userId);

        if (user) {
            // Nếu tìm thấy người dùng, cập nhật trường OTP với mã mới
            user.otp = newOTP;
            await user.save(); // Lưu thay đổi vào cơ sở dữ liệu

            // Trả về phản hồi cho phía client
            res.json({ message: "Mã OTP đã được cập nhật thành công." });
        } else {
            res.status(404).json({ message: "Không tìm thấy người dùng với ID đã cung cấp." });
        }
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình cập nhật OTP." });
    }
}
