var express = require('express');
var router = express.Router();

var users_api = require('../api/ProductSalon.api');

router.get('/productsalon', users_api.productsalon);

//SAP
router.get('/productsalon/Sap',users_api.productsalonSap);
//Cham soc da
router.get('/productsalon/ChamSocDa',users_api.productsalonChamSocDa);
//Cham soc co the
router.get('/productsalon/ChamSocCoThe',users_api.productsalonChamSocCoThe);
//Combo
router.get('/productsalon/Combo',users_api.productsalonCombo);
//Nuoc hoa
router.get('/productsalon/NuocHoa',users_api.productsalonNuocHoa);
//Kem danh rang
router.get('/productsalon/KemDanhRang',users_api.productsalonKemDanhRang);

module.exports = router;