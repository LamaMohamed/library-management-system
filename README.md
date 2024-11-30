# Library Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [API Documentation](#api-documentation)

---

## Introduction
The Library Management System is a backend service designed to manage book borrowing, returning, and user accounts efficiently. It also provides analytical reporting and export features for borrowing data in CSV.

---

## Features

- **Books**:
  - Add, update, delete, and retrieve books.
  - Search books by title, author, or ISBN.
  
- **Borrowers**:
  - Register, update, delete, and list borrowers.

- **Borrowing**:
  - Borrow and return books.
  - List overdue books.
  - Generate reports for borrowing processes.
  - Export all borrowing processes to CSV.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (using Sequelize ORM)
- **Search**: Elasticsearch
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Winston
- **Rate Limiting**: Express Rate Limit
- **Validation**: Joi
- **Export**: json2csv
- **Containerization**: Docker, Docker Compose

---

## Project Structure

```plaintext
src/
├── core/
│   ├── auth/                  # Authentication and authorization
│   ├── database/              # Database connection
│   ├── logger/                # Logger setup
│   ├── middleware/            # Reusable middleware (error handling,            validation, etc.)
├── features/
│   ├── books/                 # Books module (models, routes, controllers, services)
│   ├── borrowers/             # Borrowers module
│   ├── borrowing/             # Borrowing module
├── app.js                     # App entry point
├── server.js                  # Server startup logic
tests/
├── features/
│   ├── books/
│   │   ├── models/
│   │   │   ├── Book.test.js
│   │   ├── services/
│   │   │   ├── bookService.test.js
│   ├── controllers/
│   │   ├── bookController.test.js

