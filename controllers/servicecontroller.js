var myMD = require('../models/model');
exports.list = async (req,res,next) =>{
    var listDichVu = await myMD.ServiceModel.find().sort({name :1});
    res.render('Service/list',{listDichVu: listDichVu});
}
