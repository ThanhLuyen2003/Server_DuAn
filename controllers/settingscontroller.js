var md = require('../models/model');
exports.login = async (req,res,next) =>{
    let msg ='';
    if(req.method =='POST'){
        // lấy thông tin dựa vào email
        try{
            let objU = await md.AdminModel.findOne({username: req.body.username});
            console.log(objU);

            if(objU!= null){
                //tồi tại user => kiểm tra pass
                if(objU.pass == req.body.pass){
                    //đúng pass => lưu vào session
                    req.session.userLogin = objU;
                    //chuyển sang màn hình chính or danh sách
                    return res.redirect('/home');
                }else{
                    // ko đúng pass
                    msg = 'Sai mật khẩu!';
                }
            }else{
                msg = 'Không tồn tại user này: ' + req.body.username;
            }
        }catch(error){
            msg = error.message;
        }
    }
    res.render('settings/login',{msg: msg});
}
exports.register = (req,res,next) =>{
    res.render('settings/register');
}