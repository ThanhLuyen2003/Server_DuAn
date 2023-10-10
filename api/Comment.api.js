var md = require('../models/model');

exports.Comment = async (req, res, next) => {
    try {
        let comment =await md.CommentModel.find();

        if (comment) {
            res.status(200).json(comment);
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