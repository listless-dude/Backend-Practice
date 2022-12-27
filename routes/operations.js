const express = require('express');
const fs = require('fs');
const PATH =  __dirname + '/' + '../data/database.json';

const operations = express.Router();

operations.use(express.json());

// Getting all users using endpoint /api/users
operations.get('/users', (req, res) => {
    // Reading from our JSON database/file
    try {
        fs.readFile(PATH, 'utf8', (err, data) => {
            // Check for errors
            if (err)
                throw err;
            res.send(data);
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("File doesn't exists");
    } 
});

// Get user by Id using endpoint /api/:userId
operations.get('/user/:userId', (req, res) => {
    // Reading from our JSON database/file
    try {
        fs.readFile(PATH, 'utf8', (err, data) => {
            // data is in string, so convert it to object using JSON.parse()
            let users = JSON.parse(data);
            // Send the file 
            res.send(users['user' + req.params.userId]);
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("File doesn't exists")
    }
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
operations.post('/addUser', (req, res) => {
    // Reading from our JSON database/file
    try {
        fs.readFile(PATH, 'utf8', (err, data) => {
            // Checking for errors
            if (err)
                throw err;
            // Parsing string data to object
            data = JSON.parse(data);
            let newObj = req.body;
            // Merging data with the new object from request body
            let newData = JSON.stringify({...data, ...newObj}, null, 4);
            // Writing newData to the JSON database/file
            
            try {
                fs.writeFile(PATH, newData, (err) => {
                    if (err)
                        throw err;
                    res.send('New data added successfully:\n' + newData);
                });
            }
            catch (err)
            {
                console.log(err);
                res.status(500).send('Writing file failed');
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("File doesn't exists");
    }
});

// Deleting a user using id at endpoint /api/delete/:userId
operations.delete('/delete/:userId', (req, res) => {
    // Reading from our JSON database/file
    try {
        fs.readFile(PATH, 'utf8', (err, data) => {
            if (err)
                throw err;
                
            // Parsing sting data into object
            data = JSON.parse(data);
            // Delete the object with the userId
            try {
                delete data['user' + req.params.userId];
            }
            catch (err) {
                console.log(err);
                res.status(404).send("User doesn't exists");
            }
            // Writing the changes to our JSON database/file
            try {
                fs.writeFile(PATH, JSON.stringify(data, null, 4), (err) => {
                    if (err)
                        throw err;
                    res.send(data);
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Writing file failed");
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("File doen't exists");
    }
});

module.exports = operations;