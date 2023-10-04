const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://luyenvtph24062:luyenthanhvu123@cluster0.xfuogwv.mongodb.net/' + 'DuAnTotNghiep' + '?retryWrites=true&w=majority')
.catch((err) => {
    console.log("Lỗi kết nối CSDL");
    console.log(err);
});

module.exports = { mongoose };