var db = require('./db');
const SalonSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        describe: { type: String, required: true },
        img: { type: String, required: true },
        phone: { type: String, required: true },
        evalute: { type: String, required: true },
    },
    {
        collection: 'Salon'
    }
);
// tạo model
let salonModel = db.mongoose.model('salonModel', SalonSchema);


const TimeSchema = new db.mongoose.Schema(
    {
        time: { type: String, required: true },
       
    },
    {
        collection: 'Time'
    }
);
// tạo model
let timeModel = db.mongoose.model('timeModel', TimeSchema);

const UsersSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        birthday: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        avatar: { type: String, required: true },
        historyUsers: {type: String, required: true},
        addressUser: {type: String, required: true},
    },
    {
        collection: 'AccountUsers'
    }
);
// tạo model
let userModel = db.mongoose.model('userModel', UsersSchema);

module.exports = { salonModel, timeModel, userModel };