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

// Get user by Id using endpoint /api/:userId
app.get('/api/user/:userId', (req, res) => {
    fs.readFile(PATH, 'utf8', (err, data) => {
        let users = JSON.parse(data);
        res.send(users['user' + req.params.userId]);
    });
});

/* POST using a JSON object in the format:
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
        
        data = JSON.parse(data);
        let newObj = req.body;
        let newData = JSON.stringify({...data, ...newObj}, null, 4);
        fs.writeFile(PATH, newData, (err) => {
            if (err)
                throw err;
            res.send('New data added successfully:\n' + newData);
        });
    });
});

// Deleting a user using id at endpoint /api/delete/:userId
app.delete('/api/delete/:userId', (req, res) => {
    fs.readFile(PATH, 'utf8', (err, data) => {
        if (err)
            throw err;
            
        data = JSON.parse(data);
        delete data['user' + req.params.userId];
        fs.writeFile(PATH, JSON.stringify(data, null, 4), (err) => {
            if (err)
                throw err;
            
            res.send(data);
        });
    });
});

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});