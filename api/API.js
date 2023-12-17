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

app.put('/changePass/:email', (req, res) => {

    const email = req.params.email;

    console.log(req.body.pass);

    md.userModel.updateOne({ email: email }, { $set: { pass: req.body.pass } })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    message: "Dữ liệu cập nhật",
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

app.get('/getOrder', (req, res) => {

    md.OrderModel.find({ status: 'Đã giao hàng' })
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/getCat', (req, res) => {

    md.ServiceModel.find({ type: 'Cắt' })
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

    md.ServiceModel.find({ type: 'Chăm sóc da' })
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/getUon', (req, res) => {

    md.ServiceModel.find({ type: 'Uốn' })
        .then(data => {
            res.status(200).json(data);
        })
})


app.get('/getNhuom', (req, res) => {

    md.ServiceModel.find({ type: 'Nhuộm' })
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/time', (req, res) => {

    md.timeModel.find()
        .then(data => {
            res.status(200).json(data);
        })
})

app.get('/getBill', (req, res) => {

    Bill.find({ status: 'Sắp tới' })
        .then(data => {
            res.status(200).json(data);
        })
})

app.put('/huyBill/:idBill', (req, res) => {

    const idBill = req.params.idBill;

    Bill.updateOne({ _id: idBill }, { $set: { status: "Đã hủy lịch" } })
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

app.put('/traHang/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);
    md.OrderModel.updateOne({ _id: id }, { $set: { status: "Trả hàng" } })
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

app.post('/addBillMoney/:idUser', async (req, res) => {
    const { soDu, date, time, tongSoDu, dichVu } = req.body;
    const idUser = req.params.idUser;

    try {
        // Create a new BillMoney instance
        const newBillMoney = new md.BillMoney({
            idUser,
            soDu,
            date,
            time,
            tongSoDu,
            dichVu
        });
        // Save the new BillMoney record to the database
        await newBillMoney.save();
        // Respond with the newly created BillMoney record
        res.status(200).json(newBillMoney);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
});

app.get('/getBillMoney/:idUser', async (req, res) => {
    const idUser = req.params.idUser;
    try {
        const billMoneyRecords = await md.BillMoney.find({ idUser: idUser }).sort({ _id: -1 });
        res.status(200).json(billMoneyRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.put('/changeBalance/:idUser/:balance', (req, res) => {

    const balance = req.params.balance;
    const dichVu = req.params.dichVu;
    const id = req.params.idUser;

    md.userModel.updateOne({ _id: id }, { $set: { balance: balance, dichVu: dichVu } })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    message: "Dữ liệu đã Cập nhật",
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

app.get('/getProduct', (req, res) => {

    md.productModel.find()
        .then(data => {
            res.status(200).json(data);
        })
})

module.exports = app;