const mongoose = require('mongoose');


const useSchema = new mongoose.Schema({
    nameSalon: { type: String, require: true },
    addressSalon: { type: String, require: true },
    hour: { type: String, require: true },
    day: { type: String, require: true },
    phone: { type: String, default: '' },
    imageSalon: { type: String, default: '' },
    services: { type: Array, default: [] },
    price: { type: String, require: true },
    status: { type: String, require: true },
    note: { type: String, default: ''},
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', default: null }
},
    {
        collection: 'Bill'
    })

const Bill = mongoose.model('Bill', useSchema);
module.exports = Bill;

