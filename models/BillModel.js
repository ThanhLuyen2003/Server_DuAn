const mongoose = require('mongoose');
const useSchema = new mongoose.Schema({

    nameSalon: { type: String, required: true },
    addressSalon: { type: String, required: true },
    hour: { type: String, required: true },
    day: { type: String, required: true },
    phone: { type: String, required: true },
    imageSalon: { type: String, required: true },
    services: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId,ref:'userModel' }

},
    {
        collection: 'Bill'
    })

const Bill = mongoose.model('Bill', useSchema);
module.exports = Bill;