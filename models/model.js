var db = require('./db');
const SalonSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        describe: { type: String, required: true },
        image: { type: String, required: true },
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
        phone: { type: String, required: true },
        email: { type: String, required: true },
        pass: { type: String, required: true },
        avatar: { type: String, required: true },
        address: { type: String, required: true },
    },
    {
        collection: 'AccountUsers'
    }
);
// tạo model

let userModel = db.mongoose.model('userModel', UsersSchema);

const ProductModel = new db.mongoose.Schema({
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    trademark: { type: String, required: true },
    price: { type: String, required: true },
    describe: { type: String, required: true },
    ingredient: { type: String, required: true },
    type: { type: String, required: true },
},
    {
        collection: 'ProductSalon'
    }
)

let productModel = db.mongoose.model('productModel', ProductModel)

const serviceModel = new db.mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    describe: { type: String, required: true },

},
    {
        collection: 'Service'
    })

let ServiceModel = db.mongoose.model('serviceModel', serviceModel)


const commentModel = new db.mongoose.Schema({
    Comment: { type: String, required: true },
    idUser: { type: String, required: true }

},
    {
        collection: 'Comment'
    })
let CommentModel = db.mongoose.model('commentModel', commentModel)


const billDetailModel = new db.mongoose.Schema({
    idSalon: { type: String, required: true },
    hour: { type: String, required: true },
    day: { type: String, required: true },
    idServices: { type: Array, required: true },
    idUser: { type: String, required: true }

},
    {
        collection: 'BillDetail'
    })

let BillDetailModel = db.mongoose.model('billDetail', billDetailModel)

const cartModel = new db.mongoose.Schema({
    namePro: { type: String, required: true },
    pricePro: { type: String, required: true },
    quantity: { type: String, required: true },
    imagePro: { type: String, required: true },
    idUser: { type: String, required: true },
    idPro: { type: String, required: true }
},
    {
        collection: 'Cart'
    })

let CartModel = db.mongoose.model('cartModel', cartModel)




module.exports = { salonModel, timeModel, userModel, productModel, ServiceModel, CommentModel, BillDetailModel, CartModel };