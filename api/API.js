const express = require('express');

const app = express();

const md = require('../models/model');
const Bill = require('../models/BillModel');


app.get('/login/:phone', (req, res) => {

    var phone = req.params.phone;

    md.userModel.find({ phone: phone })
        .then(data => {

            res.status(200).json(data);

        })


})

app.get('/getCart/:id', (req, res) => {

    var idUser = req.params.id;

    md.CartModel.find({ idUser: idUser }).then(data => {
        res.status(200).json(data);
    })
})


app.post('/addCart', async (req, res) => {

    var u = new md.CartModel(req.body);

    try {
        await u.save();

        res.status(200).json(u);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.post('/addBill', async (req, res) => {

    var u = new Bill(req.body);

    try {
        await u.save();

        res.status(200).json(u);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.post('/addBillDetail', async (req, res) => {

    var u = new md.BillDetailModel(req.body);

    try {
        await u.save();

        res.status(200).json(u);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.post('/addUser', async (req, res) => {
    const { name, email, phone, pass, avatar, address } = req.body;

    try {
        const phonee = await md.userModel.findOne({ phone: phone });
        const emaill = await md.userModel.findOne({ email: email });
        if (phonee) {
            return res.status(400).json({ error: 'Số điện thoại hoặc email đã tồn tại' });
        } else if (emaill) {
            return res.status(400).json({ error: 'Số điện thoại hoặc email đã tồn tại' });
        }
        const newUser = new md.userModel({
            name,
            email,
            phone,
            pass,
            avatar,
            address
        });
        await newUser.save();
        res.status(200).json({ message: 'Người dùng được thêm thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/getBill/:idUser/:status', (req, res) => {

    const id = req.params.idUser;
    const status = req.params.status;

    Bill.find({ idUser: id, status: status })
        .sort({ _id: -1 })
        .then(data => {
            res.status(200).json(data);
        })

})




app.delete('/delCart/:id', (req, res) => {

    var id = req.params.id;

    md.CartModel.deleteOne({ _id: id })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    message: "Dữ liệu đã xóa",
                    data: data,
                });
            } else {
                res.status(404).json({ error: "Không tìm thấy dữ liệu" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
        });


})

app.post('/addOrder', async (req, res) => {


    var u = new md.OrderModel(req.body);

    try {
        await u.save();
        res.status(200).json(u);

    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/getOrder/:id/:status', (req, res) => {

    var idUser = req.params.id;
    var status = req.params.status;


    md.OrderModel.find({ idUser: idUser, status: status })
        .sort({ _id: -1 })
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/getCat', (req, res) => {

    md.ServiceModel.find({ type: 'cat' })
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/getMassage', (req, res) => {

    md.ServiceModel.find({ type: 'Massage' })
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/getChamsocda', (req, res) => {

    md.ServiceModel.find({ type: 'Chamsocda' })
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/getUon', (req, res) => {

    md.ServiceModel.find({ type: 'Uon' })
        .then(data => {
            res.status(200).json(data);
        })
})


app.get('/getNhuom', (req, res) => {

    md.ServiceModel.find({ type: 'Nhuom' })
        .then(data => {
            res.status(200).json(data);
        })
})





module.exports = app;