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
exports.editSalon = async(req,res,next) => {
    let msg ='';
     var listSalon = await myMD.salonModel.find();

     let ids = req.params.ids;
    let objS = await myMD.salonModel.findById(ids);
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
        objS._id = ids;
        try{
            await myMD.salonModel.findByIdAndUpdate({_id: ids}, objS );
            msg = 'đã sửa';
        } catch(error){
            msg = 'Error'+ error.message();
            console.log(error);
        }
    }
    res.render('Salon/edit',{msg:msg, listSalon: listSalon, objS:objS});
}
exports.deleteSalon =async (req,res,next) =>{
    let ids=req.params.ids;
    try {
       await myMD.salonModel.findByIdAndDelete({_id:ids}); 
    } catch (error) {
        
    }
    res.redirect('/salon');
}
