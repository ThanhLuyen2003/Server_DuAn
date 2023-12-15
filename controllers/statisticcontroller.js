var myMD = require('../models/model');
var billMd = require('../models/BillModel');
const moment = require('moment');

exports.thongkebanhang = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  // tìm kiếm
  var thong_bao = null;
  var dieu_kien_loc = null;
  if (typeof req.query.billSearch !== 'undefined' && req.query.billSearch.trim() !== '') {
    // Tìm kiếm theo cột 'name'
    dieu_kien_loc = {
      $or: [
        { name: { $regex: new RegExp(req.query.billSearch, 'i') } },
        { soluongnhap: parseFloat(req.query.billSearch) || 0 },
        { price: { $regex: new RegExp(req.query.billSearch, 'i') } },
        { pricenhap: { $regex: new RegExp(req.query.billSearch, 'i') } }
      ]
    };
  } else {
    thong_bao = "Không có dữ liệu";
  }

  try {
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const listSatistic = await myMD.productModel.find(dieu_kien_loc).sort(sortOptions).skip((page - 1) * limit).limit(limit);
    const listOders = await myMD.OrderModel.find();
    const totalSatistic = await myMD.productModel.countDocuments(dieu_kien_loc);

    // tính tổng tiền nhập
    let total = 0;
    const allListSatistic = await myMD.productModel.find(dieu_kien_loc).sort(sortOptions);
    allListSatistic.forEach((row) => {
      const price = row.pricenhap;
      const slnhap = row.soluongnhap;
      const tongtiennhap = price * slnhap;
      total += tongtiennhap;
    });

    // Assuming you have a product model and an order model

    // Calculate total sales value
    let totalSales = 0;
    listOders.forEach((order) => {
      if (order.status === 'Đã giao hàng') {
        order.products.forEach((product) => {
          // Replace these field names with the actual field names from your data structure
          const priceban = product.price;
          const slban = parseInt(product.quantity || 0, 10);
          const tongtienban = priceban * slban;
          totalSales += tongtienban;
        });
      }
    });
      

   
    console.log('Tổng tiền bán hàng:', totalSales);

    const totalPages = Math.ceil(totalSatistic / limit);

    res.render('thongke/thongkebanhang', {
      listSatistic: listSatistic,
      listOders: listOders,
      currentPage: page,
      totalPages: totalPages,
      totalSatistic: totalSatistic,
      total: total,
      totalSales: totalSales,
    });

  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

}

// Hưng 
exports.thongketheolichcat = async (req, res, next) => {
  try {
    const completedBills = await billMd.find({
      status: 'Đã hoàn thành',
    });
    // tổng tiền
    const totalAmount = completedBills.reduce((acc, bill) => acc + parseInt(bill.price) * 1000, 0);
    var formatMoney = formatCash(totalAmount + "");

    // Trích xuất tất cả các dịch vụ từ các hóa đơn đã hoàn thành
    const allServices = completedBills.flatMap(bill => bill.services);
    const allUser = completedBills.flatMap(bill => bill.idUser);

    const top10Services = TopList(allServices, 'name');

    // Check if allUser is an array of objects or userIds
    const users = Array.isArray(allUser)
      ? await myMD.userModel.find({ _id: { $in: allUser } })
      : [];

    // Tạo một đối tượng Map để ánh xạ ID người dùng với tên của họ
    const userNamesMap = new Map(users.map(user => [user._id.toString(), user.name]));

    // Lấy tên của khách hàng từ ID người dùng
    const userNames = Array.isArray(allUser)
      ? allUser.map(userId => userNamesMap.get(userId.toString()))
      : [];

    const top10Users = TopList(userNames, 'name');
    console.log(top10Services);
    console.log(top10Users);

    res.render('thongke/thongketheolichcat', { formatMoney: formatMoney, topService: top10Services, topUser: top10Users });
  } catch (error) {
    console.error('Lỗi khi lấy và tính tổng tiền các hóa đơn:', error);
    next(error);
  }
}

function TopList(data, propertyName) {
  const CountMap = data.reduce((map, item) => {
    const itemProperty = typeof item === 'object' ? item[propertyName] : item;

    // Skip items with undefined values
    if (itemProperty !== undefined) {
      if (map.has(itemProperty)) {
        map.set(itemProperty, map.get(itemProperty) + 1);
      } else {
        map.set(itemProperty, 1);
      }
    }

    return map;
  }, new Map());

  const sortList = [...CountMap.entries()].sort((a, b) => b[1] - a[1]);

  return sortList.slice(0, 10);
}


function formatCash(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}


