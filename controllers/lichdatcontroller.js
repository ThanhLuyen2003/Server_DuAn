var billDB = require('../models/BillModel')
var myMD = require('../models/model')
const moment = require('moment');

exports.addBill = async (req, res, next) => {
    var msg = '';
    console.log(billDB);

    if (req.method == 'POST') {
        console.log('Go to post');
        try {

            const selectedServices = req.body.services || [];
            const serviceObjects = selectedServices.map(serviceString => JSON.parse(serviceString));

            const totalPrice = calculateTotalPrice(serviceObjects);
            
            console.log(selectedServices);
            console.log(totalPrice);
            const {
                customerName,
                customerPhone,
                date,
                startHour,
                startMinute,
                noteBill
            } = req.body;
            const bookTime = startHour + ":" + startMinute;
            const newBill = new billDB({
                nameSalon: "Fpoly Barber Đội Cấn",
                addressSalon: "202 Đội Cấn, Phường Đội Cấn, Quận Ba Đình, Hà Nội",
                hour: bookTime,
                day: date,
                services: serviceObjects,
                price: totalPrice,
                customerPhone: customerPhone,
                customerName: customerName,
                note: noteBill,
                status: 'Đã hoàn thành',
                role: 'offline',
            });

            console.log(newBill);

            const savedBill = await newBill.save();
            console.log("added" + savedBill);
        } catch (error) {
            console.error('Lỗi khi thêm lịch đặt:', error);
            res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
        }
    }
    console.log('danh sách dịch vu');
    try {
        const services = await myMD.ServiceModel.find();
        res.render('home/addlichdat', { services: services });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
}

const calculateTotalPrice = (selectedServices) => {
    // Bạn cần thêm logic tính tổng giá tiền dựa trên danh sách dịch vụ
    let totalPrice = 0;

    // Giả sử mỗi đối tượng dịch vụ có trường giá là price
    selectedServices.forEach((service) => {
        // Kiểm tra xem service có chứa giá và giá trị đó là số không
        if (service.price && !isNaN(service.price)) {
            // Thêm giá tiền của mỗi dịch vụ vào tổng giá tiền
            totalPrice += parseFloat(service.price);
        }
    });

    // return tổng giá tiền được tính toán
    return totalPrice;
};