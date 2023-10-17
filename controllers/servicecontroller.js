var myMD = require('../models/model');
var fs = require ('fs');
exports.list = async (req,res,next) =>{
    var listDichVu = await myMD.ServiceModel.find().sort({name :1});
    res.render('Service/list',{listDichVu: listDichVu});
}
exports.addService = async(req,res,next) => {
    let msg ='';
     var listService = await myMD.ServiceModel.find().sort({name:1});
    if(req.method =='POST'){
       
        let objSe = new myMD.ServiceModel();
        objSe.name = req.body.name;
        objSe.price = req.body.price;
        objSe.type = req.body.type;
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objSe.image = '/uploads/'+ req.file.originalname;
            } catch (error) {
            msg = error.message;
            }
        objSe.describe = req.body.describe;
        try{
            let new_se = await objSe.save();
            console.log(new_se);
            msg = 'Lưu thành công';
        } catch(error){
            msg = 'Error'+ error.message();
            console.log(error);
        }
    }
    res.render('Service/add',{msg:msg, listService: listService});
}
exports.editService = async(req,res,next) => {
    let msg ='';
     var listService = await myMD.ServiceModel.find();

     let idse = req.params.idse;
    let objSe = await myMD.ServiceModel.findById(idse);
    if(req.method =='POST'){
       
        let objSe = new myMD.ServiceModel();
        objSe.name = req.body.name;
        objSe.price = req.body.price;
        objSe.type = req.body.type;
        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objSe.image = '/uploads/'+ req.file.originalname;
            } catch (error) {
            msg = error.message;
            }
        objSe.describe = req.body.describe;
        objSe._id = idse;
        try{
            await myMD.ServiceModel.findByIdAndUpdate({_id: idse}, objSe );
            msg = 'đã sửa';
        } catch(error){
            msg = 'Error'+ error.message();
            console.log(error);
        }
    }
    res.render('Service/edit',{msg:msg, listService: listService, objSe:objSe});
}
exports.deleteService =async (req,res,next) =>{
    let idse=req.params.idse;
    try {
       await myMD.ServiceModel.findByIdAndDelete({_id:idse}); 
    } catch (error) {
        
    }
    res.redirect('/dichvu');
}
