const WebSocket = require('ws');
const express = require('express');
const cors = require('cors'); // Thêm thư viện Cors

const app = express();

// Cấu hình Cors Policy
const corsOptions = {
  origin: 'https://example.com', // Đặt nguồn bạn muốn cho phép truy cập
  methods: 'GET,POST', // Cấu hình các phương thức được phép
  credentials: true, // Cho phép gửi thông tin xác thực (nếu cần)
};

// Sử dụng Cors Middleware
app.use(cors(corsOptions));

// Tạo máy chủ WebSocket
const wss = new WebSocket.Server({ noServer: true });

// Rest của mã của máy chủ WebSocket

// Kết nối máy chủ WebSocket với máy chủ HTTP
const server = app.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Logic tăng/giảm số người trực tuyến sau một khoảng thời gian
setInterval(() => {
  const randomChange = Math.random() > 0.5 ? 1 : -1;
  onlineUsersCount += randomChange;
  broadcastOnlineUsersCount();
}, 5000);
