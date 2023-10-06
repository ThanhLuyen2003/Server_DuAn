var md = require('../models/model');

exports.productsalon = async (req, res, next) => {
    try {
        let productsalon = await md.productModel.find();

        if (productsalon) {
            res.status(200).json(productsalon);
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