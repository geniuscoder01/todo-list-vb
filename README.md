Todoapi

All bonus features implemented. 
For setup, run npm i, node server.js

Sample api requests use Postman
Register
```
POST http://localhost:3000/register
{
  "username": “vit”,
  "password": "test123"
}
```

login and get token:
```
POST http://localhost:3000/login
{
  "username": “vit”,
  "password": "test123"
}
```

create todo
```
POST http://localhost:3000/todos
{
  "title": “task tod2 “,
  "priority": 2
}
```

get todos
```
GET http://localhost:3000/todos
```

