const express = require('express');
const http =  require('http');
const operations = require('./routes/operations');

// const HOST_NAME = 'localhost';
// const PORT = 3000;

const app = express();
app.use(express.json());

app.use('/api', operations);

module.exports = app;
// const server = http.createServer(app);
// server.listen(PORT, HOST_NAME, () => {
//     console.log(`Server running at http://${HOST_NAME}:${PORT}`);
// });