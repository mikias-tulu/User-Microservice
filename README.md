
# User Microservice

User Microservice is built with NestJS framework, designed to manage user data. It provides comprehensive functionalities for user management, including CRUD operations, user blocking/unblocking, and user search capabilities. MongoDB is used for storing user data, while Redis is employed for caching to enhance performance.


## Features

| Feature                   | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| **User Management**       | Perform CRUD operations on users (Create, Read, Update, Delete).             |
| **Block/Unblock User**    | Block or unblock users to manage access and interactions.                    |
| **Search Users**          | Search for users based on specified criteria such as age and username.       |
| **Caching**               | Utilize Redis caching to optimize performance by storing and retrieving user data efficiently. |

## Technologies Used

Here are the major technologies used in the user microservice:
- **NestJS**: Backend framework
- **MongoDB**: Database for storing user data
- **Redis**: Used for caching
- **TypeScript**: Programming language for development
- **Joi**: Schema validation library for Node.js
- **Jest**: Testing framework for unit and integration tests


## Installation

### Prerequisites

Before starting, ensure you have the following installed:

- Node.js
- MongoDB (installed and running or mongodb atlas)
- Redis (installed and running or hosted link)
- npm or yarn package manager

### setup environment variables
Set up the environment variables: Change a .env.example to .env and Change the following environment variables to your data:

- MONGODB_URI=mongodb_uri
- REDIS_HOST=redis_host
- REDIS_PORT=redis_port
- REDIS_PASSWORD=redis_password

## Installation Steps

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/mikias-tulu/User-Microservice.git
   ```
2. Go to the directory
  ```bash
  cd user-microservice
   ```
3. Install dependencies
   ```bash
    npm install
    ```
4. Start the application:
   ## Running the app

```bash
# development
$ npm start

# watch mode
$ npm start:dev

# production mode
$ npm start:prod
```

## Documentation

Access the complete set of API endpoints via our Postman collection:
> **Click here 👉[Explore API Endpoints](https://www.postman.com/galactic-trinity-3206/workspace/projects/request/26061714-41810009-3d8e-4e87-bf11-f0cee4a40829)**

## Running Tests

To run tests, run the following command

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

