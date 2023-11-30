var db = require('./db');
const mongoose = require('mongoose');

const SalonSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        describe: { type: String, required: true },
        image: { type: String, required: true },
        phone: { type: String, required: true },
        evalute: { type: String, required: true },
        idStaff: { type: mongoose.Schema.Types.ObjectId, require: true }
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
        avatar: { type: String, default: "" },
        address: { type: String, default: "" },

        otp: { type: String, default: "" },

        otp:{ type: String, default: "" },
        balance:{type:Number,default:0}

    },
    {
        collection: 'AccountUsers'
    }
);
// tạo model

let userModel = db.mongoose.model('userModel', UsersSchema);

const ProductModel = new db.mongoose.Schema({
    soluongnhap: { type: Number, required: true },
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    trademark: { type: String, required: true },
    pricenhap: { type: String, required: true },
    price: { type: String, required: true },
    describe: { type: String, required: true },
    ingredient: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
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
    idUser: { type: String, required: true },
    idPosts: { type: String, required: true },
    avatarUser: { type: String, required: true },
    nameUser: { type: String, required: true },

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

const adminSche = new db.mongoose.Schema({
    username: { type: String, required: true },
    pass: { type: String, required: true },
},
    {
        collection: 'Admin'
    })

let AdminModel = db.mongoose.model('AdminModel', adminSche)


const orderModel = new db.mongoose.Schema({
    phoneU: { type: String, required: true },
    addressU: { type: String, },
    message: { type: String, },
    nameU: { type: String, required: true },
    idUser: { type: String, required: true },
    price: { type: String, required: true },
    products: { type: Array, require: true },
    time: { type: String, require: true },
    status: { type: String, require: true },
},
    {
        collection: 'Order'
    })

let OrderModel = db.mongoose.model('orderModel', orderModel)


// model hàng nhập về
const importModel = new db.mongoose.Schema({
    soluongnhap: { type: String, required: true},
    name: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },

},
    {
        collection: 'Import'
    })

let ImportModel = db.mongoose.model('importModel', importModel)


// model nhân viên

const staffSchema = new db.mongoose.Schema({
    name: { type: String, require: true },
    userName: { type: String, require: true },
    pass: { type: String, require: true },
    email: { type: String, require: true },
    numberPhone: { type: String, require: true },
    role: { type: String, require: true },
    otherInfo: { type: String, require: true },
},
{
    collection: 'staff'
})
let StaffModel = db.mongoose.model('staff', staffSchema);



module.exports = { salonModel, timeModel, userModel, productModel, ServiceModel, CommentModel, BillDetailModel, CartModel, AdminModel, OrderModel, StaffModel, ImportModel };