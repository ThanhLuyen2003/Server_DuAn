var db = require('./db');
const SalonSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        describe: { type: String, required: true },
        img: { type: String, required: true },
        phone: { type: String, require: true },
        evalute: { type: String, require: true },
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

module.exports = { salonModel, timeModel };