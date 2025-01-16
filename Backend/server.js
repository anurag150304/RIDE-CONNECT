import * as http from 'http';
import App from './app.js';
import socket from './socket.js';

const port = process.env.PORT || 3000;
const server = http.createServer(App);
socket.initializeSocket(server);

server.listen(port, () => console.log(`Server listining on port ${port}`));