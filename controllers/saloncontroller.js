var myMD = require('../models/model');
var fs = require ('fs');
exports.list = async (req,res,next) =>{
    var listSalon = await myMD.salonModel.find().sort({name :1});
    res.render('Salon/list',{listSalon: listSalon});
}
exports.addSalon = async(req,res,next) => {
    let msg ='';
     var listSalon = await myMD.salonModel.find().sort({name:1});
    if(req.method =='POST'){
       
        let objS = new myMD.salonModel();
        objS.name = req.body.name;
        objS.address = req.body.address;
        objS.describe = req.body.describe;
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objS.image = '/uploads/'+ req.file.originalname;
            } catch (error) {
            msg = error.message;
            }
        objS.phone = req.body.phone;
        objS.evalute = req.body.evalute;
        try{
            let new_s = await objS.save();
            console.log(new_s);
            msg = 'Lưu thành công';
        } catch(error){
            msg = 'Error'+ error.message();
            console.log(error);
        }
    }
    res.render('Salon/add',{msg:msg, listSalon: listSalon});
}
