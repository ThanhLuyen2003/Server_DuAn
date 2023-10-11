var md = require('../models/model');

 exports.users = async(req, res, next)=>{
    try {
        let users = await md.userModel.find();

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

exports.addUser=async(req,res,next)=>{
    var addU = new md.userModel(req.body);

    try {
        await addU.save();
        res.status(200).json(addU)
    } catch (error) {
        res.status(200).json(error)
    }
   
}