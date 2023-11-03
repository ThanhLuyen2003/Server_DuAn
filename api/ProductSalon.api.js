var md = require('../models/model');

exports.productsalon = async (req, res, next) => {
    try {
        let productsalon = await md.productModel.find();

        if (productsalon) {
            res.status(200).json(productsalon);
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
// SAP
exports.productsalonSap = async(req,res,next)=>{
    try {
        // Find products where the 'type' field is 'Sap'
        const sapProducts = await md.productModel.find({ type: 'Sap' });

        if (sapProducts.length > 0) {
            res.status(200).json(sapProducts);
        } else {
            res.status(204).json({ msg: 'Không có kiểu dữ liệu nào là "SAP"' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server lỗi' });
    }
}
// Cham soc da
exports.productsalonChamSocDa = async(req,res,next)=>{
    try {
        // Find products where the 'type' field is 'Sap'
        const ChamSocDaProducts = await md.productModel.find({ type: 'Cham soc da' });

        if (ChamSocDaProducts.length > 0) {
            res.status(200).json(ChamSocDaProducts);
        } else {
            res.status(204).json({ msg: 'Không có kiểu dữ liệu nào là "Cham soc da"' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server lỗi' });
    }
}
// Cham soc co the
exports.productsalonChamSocCoThe = async(req,res,next)=>{
    try {
        // Find products where the 'type' field is 'Sap'
        const ChamSocCoTheProducts = await md.productModel.find({ type: 'Cham soc co the' });

        if (ChamSocCoTheProducts.length > 0) {
            res.status(200).json(ChamSocCoTheProducts);
        } else {
            res.status(204).json({ msg: 'Không có kiểu dữ liệu nào là "Cham soc co the"' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server lỗi' });
    }
}
//Combo
exports.productsalonCombo = async(req,res,next)=>{
    try {
        // Find products where the 'type' field is 'Sap'
        const ComboProducts = await md.productModel.find({ type: 'Combo' });

        if (ComboProducts.length > 0) {
            res.status(200).json(ComboProducts);
        } else {
            res.status(204).json({ msg: 'Không có kiểu dữ liệu nào là "Combo"' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server lỗi' });
    }
}
//Nuoc hoa
exports.productsalonNuocHoa = async(req,res,next)=>{
    try {
        // Find products where the 'type' field is 'Sap'
        const NuocHoaProducts = await md.productModel.find({ type: 'Nuoc hoa' });

        if (NuocHoaProducts.length > 0) {
            res.status(200).json(NuocHoaProducts);
        } else {
            res.status(204).json({ msg: 'Không có kiểu dữ liệu nào là "Nuoc hoa"' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server lỗi' });
    }
}
//kem danh rang
exports.productsalonKemDanhRang = async(req,res,next)=>{
    try {
        // Find products where the 'type' field is 'Sap'
        const KemDanhRangProducts = await md.productModel.find({ type: 'Kem danh rang' });

        if (KemDanhRangProducts.length > 0) {
            res.status(200).json(KemDanhRangProducts);
        } else {
            res.status(204).json({ msg: 'Không có kiểu dữ liệu nào là "Kem danh rang"' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server lỗi' });
    }
}
