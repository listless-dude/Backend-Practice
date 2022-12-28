# microtask-1
A simple API using node and express.
Make changes to a JSON file using the following endpoints:

Hosted on deta.sh:

``` https://hbnqwi.deta.dev ```

GET: 'https://hbnqwi.deta.dev/api/users' - Returns all users

GET: 'https://hbnqwi.deta.dev/api/user/:id' - Return a specific user with id

POST: 'https://hbnqwi.deta.dev/api/addUser' - Adds users to the JSON database, example: 
```
{
    "user#id" : {
        "name": "username",
        "password": "pass",
        "id": #id
    }
}
```
DELETE: 'https://hbnqwi.deta.dev/api/delete/:id' - Delete a specific user with id