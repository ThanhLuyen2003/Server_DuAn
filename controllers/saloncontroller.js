var myMD = require('../models/model');
exports.list = async (req,res,next) =>{
    var listSalon = await myMD.salonModel.find().sort({name :1});
    res.render('Salon/list',{listSalon: listSalon});
}
