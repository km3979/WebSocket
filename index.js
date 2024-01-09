const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let onlineUsersCount = 1339; // Khởi tạo số người trực tuyến với giá trị tối thiểu là 1339

wss.on('connection', (ws) => {
  // Khi có một kết nối WebSocket mới, gửi số người trực tuyến hiện tại cho máy khách
  ws.send(JSON.stringify({ onlineUsersCount }));

  ws.on('close', () => {
    // Khi một kết nối bị đóng, không cần làm gì cả
  });
});

// Giả sử bạn có một cơ chế khác để cập nhật số lượng người trực tuyến từ nguồn dữ liệu bên ngoài
// Ví dụ: bạn có thể có một hàm updateOnlineUsersCount() để cập nhật giá trị này
// Sau khi cập nhật, bạn có thể gọi broadcastOnlineUsersCount() để thông báo cho tất cả các máy khách

function updateOnlineUsersCount(newCount) {
  onlineUsersCount = newCount;
  broadcastOnlineUsersCount();
}

function broadcastOnlineUsersCount() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ onlineUsersCount }));
    }
  });
}

// Sử dụng một cơ chế khác để cập nhật số lượng người trực tuyến (ví dụ: bằng cách lắng nghe sự kiện từ nguồn dữ liệu bên ngoài)
// Sau đó, gọi updateOnlineUsersCount() để cập nhật số lượng người trực tuyến mới
// Ví dụ: updateOnlineUsersCount(1400) sẽ cập nhật số người trực tuyến thành 1400 và thông báo cho tất cả máy khách WebSocket

console.log('WebSocket server is running on port 8080');
