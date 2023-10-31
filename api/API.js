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

    var u = new md.userModel(req.body);

    try {
        await u.save();

        res.status(200).json(u);

    } catch (error) {
        res.status(500).send(error);
    }
})


app.get('/getBill/:idUser', (req, res) => {

    const id = req.params.idUser;

    Bill.find({ idUser: id }).then(data => {
        res.status(200).json(data);
    })


})


app.get('/addComment/:idBv', async (req, res) => {

    var id = req.params.idBv;

    md.CommentModel.find({ idUser: id }).then(data => {
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


module.exports = app;