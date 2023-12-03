const mongoose = require('mongoose');
const useSchema = new mongoose.Schema({

    nameSalon: { type: String,  },
    addressSalon: { type: String,  },
    hour: { type: String,  },
    day: { type: String,  },
    phone: { type: String,  },
    imageSalon: { type: String,  },
    services: { type: String,  },
    price: { type: String,  },
    status: { type: String,  },
    note: {type: String, },
    idUser: { type: mongoose.Schema.Types.ObjectId,ref:'userModel' }

},
    {
        collection: 'Bill'
    })

const Bill = mongoose.model('Bill', useSchema);
module.exports = Bill;