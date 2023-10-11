var md = require('../models/model');

exports.serviceApi = async (req, res, next) => {
    try {
        let service = await md.ServiceModel.find();

        if (service) {
            res.status(200).json(service);
        } else {
            res.status(204).json({
                msg: 'khong co du lieu hihihihidsd',

            });
        }
    } catch (err) {
        return res.status(err.status).json({
            msg: err.massage
        });
    }
}