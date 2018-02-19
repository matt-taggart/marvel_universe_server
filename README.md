# Marvel Universe Server

A server built in Node used to access information from the Marvel REST API.  The endpoints provided in this service grant a user the ability to conveniently fetch information from the Marvel Universe (comics, characters, etc.). Routes are also provided for user authentication and retrieving a customer profile.

## Getting Started

The following instructions will allow you to get the API up and running on your local machine.

### Prerequisites

In order to run the Marvel Universe Server, you will need to first download PostgresSQL on your local machine.  Download links can be found at `https://www.postgresql.org/download/`.

You will also need to set the following environment variables:

PGUSER

PGHOST

PGPASSWORD

PGDATABASE

PGPORT

PUBLIC_KEY => Your personal public key from the Marvel Developer Portal @ `https://developer.marvel.com/`

PRIVATE_KEY => Your personal private key from the Marvel Developer Portal

API_HOST=http://gateway.marvel.com

API_VERSION=v1

API_ACCESS=public

### Installing

Clone the repo:

`git clone https://github.com/matt-taggart/marvel_universe_server.git`

Install node modules:

`yarn install`

Start up server:

`yarn start`


## Running Tests

This project uses Mocha, Chai and Supertest for integration testing.  To run the entire test suite, you can use the command `yarn test`.

## Built With

* Koa - Web framework for building web applications and APIs. Provides support for ES2015 and Async functions.
* PG - Non-blocking PostgreSQL client for Node.
* jsonwebtoken - An implementation of JSON Web Tokens for authentication.
* Boom - Creates HTTP-friendly error object.

## API Endpoints

### Login

* **URL**

  `/login`

* **Method**

  `POST`
  
* **URL Params**

  None

* **Query Params**

  None
  
* **Request Body**

  ```
  {
    "email": "stan.lee@marvel.com",
    "password": "D@r3D3vil"
  }
  ```

* **Success Response**

  * Code:  200

  * Response:
    ```
    {
      "id": "5b89523a-bb2a-4953...",
      "name": "Stan Lee",
      "email": "stan.lee@marvel.com",
      "gender": "Male",
      "age": 95,
      "savedData": [
        { "id": 1, "name": "Spiderman", "type": "character" },
        { "id": 2, "name": "Acts of Vengeance", "type": "event" },
      ]
    }
    ```

* **Error Response**

  * Code:  401

  * Response:

  ```
  {
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Invalid email or password provided"
  }
  ```

### Logout

* **URL**

  `/logout`

* **Method**

  `DELETE`
  
* **URL Params**

  None

* **Query Params**

  None
  
* **Request Body**

  None

* **Success Response**

  * Code:  204

  * Response: None

* **Error Response**

  * Code:  400

  * Response:

  ```
  {
    "statusCode": 400,
    "error": "Bad Request",
    "message": "User is already logged out"
  }
  ```

### Get User

* **URL**

  `/users`

* **Method**

  `GET`
  
* **URL Params**

  None

* **Query Params**

  None
  
* **Request Body**

  None

* **Success Response**

  * Code:  200

  * Response:
    ```
    {
      "id": "5b89523a-bb2a-4953...",
      "name": "Stan Lee",
      "email": "D@r3D3vil",
      "gender": "Male",
      "age": 95,
      "savedData": [
        { "id": 1, "name": "Spiderman", "type": "character" },
        { "id": 2, "name": "Acts of Vengeance", "type": "event" },
      ]
    }
    ```

* **Error Response**

  * Code:  401

  * Response:

  ```
  {
    "statusCode": 400,
    "error": "Bad Request",
    "message": "User does not exist"
  }
  ```

### Create User

* **URL**

  `/users`

* **Method**

  `POST`
  
* **URL Params**

  None

* **Query Params**

  None
  
* **Request Body**
    ```
    {
      "name": "Stan Lee",
      "email": "stan.lee@marvel.com",
      "password": "D@r3D3vil",
      "gender": "Male",
      "age": 95,
    }
    ```

* **Success Response**

  * Code:  201

  * Response:
    ```
    {
      "id": "5b89523a-bb2a-4953...",
      "name": "Stan Less",
      "email": "stan.lee@marvel.com",
      "gender": "Male",
      "age": 95,
      "savedData": [
        { "id": 1, "name": "Spiderman", "type": "character" },
        { "id": 2, "name": "Acts of Vengeance", "type": "event" },
      ]
    }
    ```

* **Error Response**

  * Code:  401

  * Response:

  ```
  {
    "statusCode": 400,
    "error": "Bad Request",
    "message": "User does not exist"
  }
  ```

### Save User Resource

* **URL**

  `/users/:resourceType/:id`

* **Method**

  `POST`
  
* **URL Params**


  `:resourceType` => Type of resource saved (i.e. character, comic, etc.)

  `:id` => Unique resource identifier of item to save

* **Query Params**

  None
  
* **Request Body**

  None

* **Success Response**

  * Code:  201

  * Response:
    ```
    {
      "resourceType": "character",
      "resourceId": 123
    }
    ```

* **Error Response**

  * Code:  400

  * Response:

  ```
  {
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Unable to save resource"
  }
  ```

### Get Characters

* **URL**

  `/characters`

* **Method**

  `GET`
  
* **URL Params**

  None

* **Query Params**

  See developer.marvel.com for details
  
* **Request Body**

  None

* **Success Response**

  * Code:  200

  * Response: See developer.marvel.com for details

* **Error Response**

  * Code:  200

  * Response:

  ```
  {
    "statusCode": 500,
    "error": "Internal Server Error",
    "message": "Internal Server Error"
  }
  ```

### Get Characters By ID

* **URL**

  `/characters/:id`

* **Method**

  `GET`
  
* **URL Params**

  `:id` => Unique resource identifier of character

* **Query Params**

  See Marvel API Docs
  
* **Request Body**

  None

* **Success Response**

  * Code:  200

  * Response: See developer.marvel.com for details

* **Error Response**

  * Code:  200

  * Response:

  ```
  {
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not Found"
  }
  ```

### Get Character Comics By ID

* **URL**

  `/characters/:id/comics`

* **Method**

  `GET`
  
* **URL Params**

  `:id` => Unique resource identifier of character

* **Query Params**

  See Marvel API Docs
  
* **Request Body**

  None

* **Success Response**

  * Code:  200

  * Response: See developer.marvel.com for details

* **Error Response**

  * Code:  200

  * Response:

  ```
  {
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not Found"
  }
  ```

### Get Character Series By ID

* **URL**

  `/characters/:id/series`

* **Method**

  `GET`
  
* **URL Params**

  `:id` => Unique resource identifier of character

* **Query Params**

  See Marvel API Docs
  
* **Request Body**

  None

* **Success Response**

  * Code:  200

  * Response: See developer.marvel.com for details

* **Error Response**

  * Code:  200

  * Response:

  ```
  {
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not Found"
  }
  ```

### Get Character Events By ID

* **URL**

  `/characters/:id/events`

* **Method**

  `GET`
  
* **URL Params**

  `:id` => Unique resource identifier of character

* **Query Params**

  See Marvel API Docs
  
* **Request Body**

  None

* **Success Response**

  * Code:  200

  * Response: See developer.marvel.com for details

* **Error Response**

  * Code:  200

  * Response:

  ```
  {
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not Found"
  }
  ```

### Comics, Events, Series, & Creators


* Follow a similar convention to characters endpoints.
