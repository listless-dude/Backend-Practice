const express = require('express');
const http =  require('http');
const fs = require('fs');

const HOST_NAME = 'localhost';
const PORT = 3000;
const PATH = __dirname + '/data/database.json';

const app = express();
app.use(express.json());

const server = http.createServer(app);

// Getting all users using endpoint /api/users
app.get('/api/users', (req, res) => {
    fs.readFile(PATH, 'utf8', (err, data) => {
        if (err)
            throw err;
        res.send(data);
    });
});

// Get user by Id using endpoint /api/:getUserId
app.get('/api/:getUserId', (req, res) => {
    fs.readFile(PATH, 'utf8', (err, data) => {
        let users = JSON.parse(data);
        
    });
});

/* POST requires a JSON in the format example
    {
        "user#id" : {
            "name": "username",
            "password": "pass",
            "id": #id
        }
    }
*/
// Adding user into JSON database using endpoint /api/addUser
app.post('/api/addUser', (req, res) => {
    fs.readFile(PATH, 'utf8', (err, data) => {
        if (err)
            throw err;
        
        let newObj = JSON.parse(data);
        let newObj2 = req.body;
        let newData = JSON.stringify({...newObj, ...newObj2});
        fs.writeFile(PATH, newData, (err) => {
            if (err)
                throw err;
            res.send('New data added successfully:\n' + newData);
        });
    });
});



server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});