# Node.js REST API

## Description

This is a simple Node.js REST API built with Express.js. It provides CRUD (Create, Read, Update, Delete) operations for managing resources such as users, products, or any other data type. The project structure follows a modular design for easy scalability and maintainability.

## Features

- RESTful API with CRUD operations
- Error handling
- Basic authentication using JWT (JSON Web Token)
- Input validation
- Modular architecture
- Environment-based configurations

## Technologies

- Node.js
- Express.js
- MongoDB (Mongoose for data modeling)
- JSON Web Tokens (JWT) for authentication
- Joi for input validation

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (for database)

## Installation

1. Clone the repository

```bash
git clone https://github.com/Hashith00Final-year-Project-Managment-System.git
```

2. Navigate to the project directory

```bash
cd Final-year-Project-Managment-System
```

3. Install dependencies

```bash
npm install
```

4. Create a config file and inside that create a .env file and set the following environment variables. And add relavent values for them

```bash
PORT=4000
MOGODB_CONNECTION_STRING=
JWT_SECRET_KEY=
JWT_EXPIRES= 7d
COOKIE_EXPIRE=604800
```

3. Start the server

```bash
node index.js∆
```
