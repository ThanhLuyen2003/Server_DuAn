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
    const userId = req.params.id; // Lấy ID người dùng từ URL
    const newOTP = req.body.otp; // Lấy giá trị OTP từ yêu cầu

    try {
        // Tìm người dùng dựa trên ID và cập nhật trường OTP với mã mới
        const updatedUser = await md.userModel.findByIdAndUpdate(userId, { otp: newOTP }, { new: true });

        if (updatedUser) {
            res.json({ message: "Mã OTP đã được cập nhật thành công." });
        } else {
            res.status(404).json({ message: "Không tìm thấy người dùng với ID đã cung cấp." });
        }
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình cập nhật OTP." });
    }
}





exports.deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const deletedUser = await md.userModel.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'Xóa người dùng thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

exports.updateAvatar = async (req, res, next) => {
    const userId = req.params.id;
    const newAvatar = req.body.avatar;

    try {
        const updatedUser = await md.userModel.findByIdAndUpdate(userId, { avatar: newAvatar }, { new: true });

        if (updatedUser) {
            res.json({ message: "Cập nhật avatar thành công" });
        } else {
            res.status(404).json({ message: "Không tìm thấy id người dùng" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Lỗi " });
    }
};



exports.depositMoney = async (req, res, next) => {
    const userId = req.params.id;
    const { amount } = req.body;

    try {
        // Find the user by ID
        const user = await md.userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy user' });
        }

        // Validate the amount
        if (isNaN(amount) || parseFloat(amount) <= 0) {
            return res.status(400).json({ message: 'Số lỗi' });
        }

        // Deposit money
        user.balance += parseFloat(amount);
        await user.save();

        return res.status(200).json({ message: 'Nạp thành công', user });
    } catch (error) {
        console.error('Error ', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
exports.updatePassword = async (req, res, next) => {
    const userId = req.params.id;
    const newPassword = req.body.newPassword;

    try {
        // Find the user by ID
        const user = await md.userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        // Update the password
        user.pass = newPassword;
        await user.save();

        return res.status(200).json({ message: 'Cập nhật mật khẩu thành công', user });
    } catch (error) {
        console.error('Error ', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};