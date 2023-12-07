const mongoose = require('mongoose');
const useSchema = new mongoose.Schema({


    nameSalon: { type: String, require: true },
    addressSalon: { type: String, require: true },
    hour: { type: String, require: true },
    day: { type: String, require: true },
    phone: { type: String, require: true },
    imageSalon: { type: String, require: true },
    services: { type: Array, require: true },
    price: { type: String, require: true },
    status: { type: String, require: true },
    note: { type: String, require: true},
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', require: true }


},
    {
        collection: 'Bill'
    })

const Bill = mongoose.model('Bill', useSchema);
module.exports = Bill;