# microtask-1
A simple API using node and express.
Make changes to a JSON file using the following endpoints:

GET: '.../api/users' - Returns all users

GET: '.../api/user/:id' - Return a specific user with id

POST: '.../api/addUser' - Adds users to the JSON database, example: 
```
{
    "user#id" : {
        "name": "username",
        "password": "pass",
        "id": #id
    }
}
```
DELETE: '.../api/delete/:id' - Delete a specific user with id