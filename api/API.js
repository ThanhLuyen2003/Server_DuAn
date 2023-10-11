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


app.post('/addBill', async (req, res) => {

    var u = new Bill(req.body);

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

app.post('/addUser',async (req, res) => {

    var addU = new md.userModel(req.body);
    try {
        await addU.save();
        res.status(200).json(addU);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = app;