const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let onlineUsersCount = 1339; // Khởi tạo số người trực tuyến với giá trị tối thiểu là 1339

wss.on('connection', (ws) => {
  // Khi có một kết nối WebSocket mới, tăng số người trực tuyến và gửi nó cho tất cả máy khách
  onlineUsersCount++;
  broadcastOnlineUsersCount();

  ws.on('message', (message) => {
    if (message === 'getOnlineUsersCount') {
      // Nếu máy khách yêu cầu số người trực tuyến, gửi lại số người trực tuyến hiện tại cho máy khách
      sendOnlineUsersCount(ws);
    }
  });

  ws.on('close', () => {
    // Khi một kết nối bị đóng, giảm số người trực tuyến và gửi nó cho tất cả máy khách
    onlineUsersCount--;
    broadcastOnlineUsersCount();
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
