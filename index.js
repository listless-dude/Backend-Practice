import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const HOST_NAME = 'localhost';
const PORT = 3000;

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});