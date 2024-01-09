const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let onlineUsersCount = 1339; // Khởi tạo số người trực tuyến với giá trị tối thiểu là 1339

wss.on('connection', (ws) => {
  // Khi có một kết nối WebSocket mới, gửi số người trực tuyến hiện tại cho máy khách
  sendOnlineUsersCount(ws);

  ws.on('message', (message) => {
    // Xử lý yêu cầu từ máy khách
    if (message === 'getOnlineUsersCount') {
      // Nếu máy khách yêu cầu số người trực tuyến, gửi lại số người trực tuyến hiện tại cho máy khách
      sendOnlineUsersCount(ws);
    } else {
      // Xử lý các yêu cầu khác nếu cần
    }
  });

  ws.on('close', () => {
    // Khi một kết nối bị đóng, không cần làm gì cả vì chúng ta không theo dõi kết nối từ bên ngoài
  });
});

function broadcastOnlineUsersCount() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ onlineUsersCount }));
    }
  });
}

function sendOnlineUsersCount(client) {
  // Gửi số người trực tuyến hiện tại cho máy khách
  client.send(JSON.stringify({ onlineUsersCount }));
}

console.log('WebSocket server is running on port 8080');

// Logic tăng/giảm số người trực tuyến sau một khoảng thời gian
setInterval(() => {
  const randomChange = Math.random() > 0.5 ? 1 : -1;
  onlineUsersCount += randomChange;
  broadcastOnlineUsersCount();
}, 5000);
