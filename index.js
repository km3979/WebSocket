const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let numbers = [8, 8, 8, 8, 8, 1, 6, 7, 2];

const updateNumbers = () => {
    for (let i = numbers.length - 3; i < numbers.length; i++) {
        const increment = Math.floor(Math.random() * 3) + 1;
        numbers[i] += increment;
        if (numbers[i] > 9) {
            numbers[i] = numbers[i] % 10;
            // Propagate the carry-over to the previous digits
            for (let j = i - 1; j >= 0; j--) {
                numbers[j]++;
                if (numbers[j] <= 9) break;
                numbers[j] = 0;
            }
        }
    }
    return numbers;
};

setInterval(() => {
    const updatedNumbers = updateNumbers();
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(updatedNumbers));
        }
    });
}, 1000);

wss.on('connection', ws => {
    ws.send(JSON.stringify(numbers)); // Send initial state
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
