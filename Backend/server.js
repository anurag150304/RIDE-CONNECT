import * as http from 'http';
import App from './App.js';
import { initializeSocket } from './socket.js';

const port = process.env.PORT || 3000;
const server = http.createServer(App);
initializeSocket(server);

server.listen(port, () => console.log(`Server listining on port ${port}`));