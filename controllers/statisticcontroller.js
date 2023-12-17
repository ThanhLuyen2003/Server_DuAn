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
    let filter = { status: 'Đã hoàn thành' };
    const formattedToday = new Date().toISOString().slice(0, 10);
    let formattedStartDate = formattedToday;
    let formattedEndDate = formattedToday;

    // Kiểm tra xem có query parameters startDay và endDay hay không
    if (req.query.startDay && req.query.endDay) {
      const startDay = moment(req.query.startDay);
      const endDay = moment(req.query.endDay);

      // Chuyển đổi ngày về định dạng 'YYYY-MM-DD'
      formattedStartDate = startDay.format('YYYY-MM-DD');
      formattedEndDate = endDay.format('YYYY-MM-DD');

      // Thêm điều kiện tìm kiếm theo ngày
      filter.day = {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      };
    }
    // Thực hiện truy vấn với điều kiện tìm kiếm
    const completedBills = await billMd.find(filter);
    // tổng tiền
    const totalAmount = totalAmountFunc(completedBills);

    // Tính tổng doanh thu của mỗi salon
    const salonRevenueMap = new Map();
    for (const bill of completedBills) {
      const salonName = bill.nameSalon;
      const servicePrice = parseFloat(bill.price);

      salonRevenueMap.set(salonName, (salonRevenueMap.get(salonName) || 0) + servicePrice);
    }

    // Sắp xếp và lấy top salon theo tổng doanh thu
    const sortedSalonRevenueList = [...salonRevenueMap.entries()].sort((a, b) => b[1] - a[1]);

    // Lấy thông tin chi tiết về salon từ bảng salon
    const salonDetails = await myMD.salonModel.find({ name: { $in: sortedSalonRevenueList.map(item => item[0]) } });

    // Kết hợp thông tin salon và doanh thu để render
    const result = sortedSalonRevenueList.map(([salonName, revenue]) => {
      const salonDetail = salonDetails.find(salon => salon.name === salonName);
      return {
        salonName: salonName,
        revenue: revenue,
        salonDetail: salonDetail || {},
      };
    });

    // Trích xuất tất cả các dịch vụ từ các hóa đơn đã hoàn thành
    const allServices = completedBills.flatMap(bill => bill.services);

    // Thống kê top 10 dịch vụ theo số lần sử dụng
    const top10ServicesByCount = TopList(allServices, 'name');

    // Thống kê top 10 dịch vụ theo doanh thu
    const serviceRevenueMap = new Map();
    for (const bill of completedBills) {
      for (const service of bill.services) {
        const serviceInfo = await myMD.ServiceModel.findOne({ name: service.name });

        if (serviceInfo) {
          const revenue = serviceInfo.price;
          serviceRevenueMap.set(service.name, (serviceRevenueMap.get(service.name) || 0) + revenue);
        }
      }
    }

    // Sắp xếp và lấy top 10 dịch vụ theo doanh thu
    const sortedServiceRevenueList = [...serviceRevenueMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    console.log(sortedServiceRevenueList);


    res.render('thongke/thongketheolichcat', {
      formattedStartDate: formattedStartDate,
      formattedEndDate: formattedEndDate,
      totalAmount: totalAmount,
      topServiceByCount: top10ServicesByCount,
      topServiceByRevenue: sortedServiceRevenueList,
      salonRevenueList: result,
    });
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

function TopListByRevenue(data, propertyName, pricePropertyName) {
  const RevenueMap = data.reduce((map, item) => {
    const itemName = typeof item === 'object' ? item[propertyName] : item;
    const itemPrice = typeof item === 'object' ? parseFloat(item[pricePropertyName]) : undefined;
    console.log(itemPrice);

    // Skip items with undefined values or incomplete status
    if (itemName !== undefined && itemPrice !== undefined) {
      const revenue = itemPrice * (map.has(itemName) ? map.get(itemName) + 1 : 1);
      map.set(itemName, revenue);
    }

    return map;
  }, new Map());

  const sortList = [...RevenueMap.entries()].sort((a, b) => b[1] - a[1]);

  return sortList.slice(0, 10);
}





function totalAmountFunc(listBill) {
  return listBill.reduce((acc, bill) => acc + parseInt(bill.price), 0);
}

