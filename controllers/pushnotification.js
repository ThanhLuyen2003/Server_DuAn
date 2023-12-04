const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Cấu hình VAPID keys
const vapidKeys = {
  publicKey: 'YOUR_PUBLIC_KEY',
  privateKey: 'YOUR_PRIVATE_KEY',
};

// Thiết lập VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.use(bodyParser.json());

// Lưu trữ danh sách subscription trong một mảng
const subscriptions = [];

// Route để nhận yêu cầu đăng ký subscription từ app mobile
app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  
  // Lưu trữ subscription trong mảng subscriptions
  subscriptions.push(subscription);

  res.status(201).json({});
});

// Route để gửi thông báo từ web quản trị về app mobile
app.get('/api/send-notification', (req, res) => {
  const status = req.query.status;

  // Gửi thông báo đến từng subscription
  subscriptions.forEach((subscription) => {
    const payload = JSON.stringify({ title: 'Thông báo', body: status });

    webpush
      .sendNotification(subscription, payload)
      .catch((error) => {
        console.error('Lỗi khi gửi thông báo:', error);
      });
  });

  res.status(200).json({});
});

app.listen(3000, () => {
  console.log('Server đang lắng nghe trên cổng 3000');
});