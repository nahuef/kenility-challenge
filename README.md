# Kenility Code Challenge

## Code challenge
A new company needs to address these requirements:
- Create a Node API with Typescript.
- Connect the Node API to MongoDB using mongoose (desirable models in typescript).
- We need to develop three endpoints behind a basic authentication (username and password).
- Create a user with name, last name, address, and profile picture (this should be a file).
- Retrieve users.
- Update user.

Star point: Dockerize MongoDB and the Node API

### TODO
- Star point: Dockerize MongoDB and the Node API
- profile picture (this should be a file).

## Installation
1. Clone the repository from GitHub.
2. `npm install` to install dependencies.
3. `npm run tsc` to compile typescript.
4. `npm run server` to build and run the project with auto reload (nodemon) or `npm run start` without it.
5. Server should be running at `http://localhost:5000/`

You must have a MongoDB server running, and modify the mongoURI at `./config/default.json`, the default is the usual `mongodb://localhost:27017/`.

## Usage

> Feel free to import the following Postman collection
> https://api.postman.com/collections/781023-f5c64e24-f7ed-4e74-ba0f-471610f6c62f?access_key=PMAT-01GZH5PQCT23JRKSEJ0S8KXX9F
>


### Create an user with email and password to get an auth token at:
`POST http://localhost:5000/api/user`
```JSON
{
  "email": "test@test.com",
  "password": "testing"
}
```

We will use the token sent back in the response for the following endpoints, added as `x-auth-token` header of the requests.

### Create or update a profile at:
`POST http://localhost:5000/api/profile`

Mandatory fields are `name`, `lastName`, `address` and `picture`.

`picture` is an image so we will send the request as `form-data`.

To update a profile include in the body of the `form-data` request the field `userId` that you got back when you created that profile.

### Get profiles:
`GET http://localhost:5000/api/profile`

### Delete a profile:
`DELETE http://localhost:5000/api/profile`

With the `userId` to delete in the body of the request.

### Auth
Get a new token using your credentials (email and password) at:

`POST http://localhost:5000/api/auth`
