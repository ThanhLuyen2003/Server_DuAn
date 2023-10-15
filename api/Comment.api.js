var md = require('../models/model');

exports.Comment = async (req, res, next) => {
        const idu= req.params.idPosts
        try {
            const story= await md.productModel.findById(idu)
            if(!story){
                return res.status(404).json({messge:"Bai viet khong ton tai"})
            }
            
            res.status(200).json({story})
        } catch (error) {
            return res.status(500).json({messge:error.messge})
        }
}