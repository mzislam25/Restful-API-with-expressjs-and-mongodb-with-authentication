# Restful-API-with-expressjs-and-mongodb-with-authentication
> RESTful API using Nodejs, Express and MongoDB along with Passport-jwt authentication

## Quick Start

``` bash
# Install 
npm install

## Running the app
npm start

```

## Endpoints

### Register new user
``` bash
POST user/register
{
  "username": "string"
  "password": "string"
  "name": "string"
}
```

### Login User
```
POST user/login
{
  "username": "string"
  "password": "string"
}
```
### Notes
```bash
For notes route place the token in the header as 'secret_token'
```
### Add notes
``` bash
POST notes
{
  "title": "string",
  "content": "string"
}
### List all notes
``` bash
GET notes
```
### Get single note
``` bash
GET notes/{id}
```
### Delete note
``` bash
DELETE notes/{id}
```
### Update notes
``` bash
PUT notes/{id}
{
  "title": "string",
  "content": "string"
}
```

## App Info
Simple CRUD Application with user authentication

### Author

Zahir
[Krittimmanush](http://www.krittimmanush.com)

### Version

1.0.0

### License

This project is licensed under the MIT License
