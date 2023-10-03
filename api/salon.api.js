var md = require('../models/model');

 exports.salon = async(req, res, next)=>{
    try {
        let salon = await md.salonModel.find();

        if (salon) {
            res.status(200).json(salon);
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