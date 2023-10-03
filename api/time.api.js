var md = require('../models/model');

 exports.time = async(req, res, next)=>{
    try {
        let time = await md.timeModel.find();

        if (time) {
            res.status(200).json(time);
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