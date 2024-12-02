# Library Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Application Setup and Prerequisites](#application-setup-and-prerequisites)
5. [Project Structure](#project-structure)
6. [API Documentation](#api-documentation)

---

## Introduction
The Library Management System is a backend service designed to manage book borrowing, returning, and user accounts efficiently. It also provides analytical reporting and export features for borrowing data in CSV.

---

## Features

- **Authentication and Authorization**:
  - ***Basic Authentication***: Authenticate users using email and password, secured with JWT (JSON Web Token).
  - ***Role-based Authorization***:
    - Access to routes and actions is restricted based on user roles (e.g., Admin, Librarian, user).
    - Control over who can manage books, borrowers, and borrowing processes.
  - ***Token Management***:
    - Use HTTP cookies for refresh token storage, ensuring enhanced security.
    - Access tokens are short-lived and sent with requests in headers (1h).
    - Refresh tokens are used to obtain new access tokens without requiring re-login.

- **Users**:
  - Register, login, logout.
  - Assign roles to users for access control.

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
- **Cache**: Redis
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Winston
- **Rate Limiting**: Express Rate Limit
- **Validation**: Joi
- **Export**: json2csv
- **Containerization**: Docker, Docker Compose

---

## Application Setup and Prerequisites
- Ensure that Docker and Docker Compose are installed on your system.

- Run the following command to build and run the application:
  ```plaintext
  docker-compose up --build
  ```
---

## Project Structure

```plaintext
src/
├── core/
│   ├── auth/                  # Authentication and authorization
│   ├── database/              # Database connection
│   ├── logger/                # Logger setup
│   ├── middleware/            # Reusable middleware (error handling, validation, etc.)
├── features/
│   ├── books/                 # Books module (models, routes, controllers, services)
│   ├── borrowers/             # Borrowers module
│   ├── borrowing/             # Borrowing module
├── app.js                     # App entry point
├── server.js                  # Server startup logic
tests/
├── features/
│   ├── books/
│   │   ├── services/
│   │   │   ├── bookService.test.js
│   │   ├── controllers/
│   │   │   ├── bookController.test.js
```

## API Documentation
#### PORT: 3000
#### Base_URL: /api/v1

- **Users**
   - Register: POST /auth/register
     - Request
        ```plaintext
          {
            "email": "test4@gmail.com",
            "name": "Lama",
            "password": "test_dhdhd",
            "role": "admin"
          }
        ```
     - Response 
        ```plaintext
        {
          "message": "User registered successfully!"
        }
        ```

    - Login: POST /auth/login     
      - Request
        ```plaintext
          {
            "email": "test4@gmail.com",
            "name": "Lama",
            "password": "test_dhdhd",
            "role": "admin"
          }
        ```
      - Response 
        ```plaintext
        {
          "message": "User registered successfully!"
        }
        ```
        And set refresh token 

    - RefreshToken: GET /auth/refresh 
      - Response 
        ```plaintext
        {
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzMTY2ODk0LCJleHAiOjE3MzMxNzA0OTR9.g8MSqJ8ZtOBKx6vSI30mWKBWN-9VxpVdsE4WaLyz4Iw"
        }
        ```

    - Logout: GET /auth/logout  
      - Response 
        ```plaintext
        {
            "message": "Logged out successfully"
        }
        ```
- **Books**
  - Add Book: POST /books
     - Request
        ```plaintext
        {
          "title": "test",
          "author": "jack",
          "isbn": "9780439559",
          "quantity": 8,
          "shelfLocation": "test"
        }
        ```
     - Response 
        ```plaintext
        {
            "message": "Book created successfully",
            "book": {
                "id": 1,
                "title": "test",
                "author": "jack",
                "isbn": "9780439559",
                "quantity": 8,
                "shelfLocation": "test",
                "updatedAt": "2024-12-02T19:18:03.860Z",
                "createdAt": "2024-12-02T19:18:03.860Z"
            }
        }
        ```

  - List Books: GET /books?page=1&pageSize=5
      - Response 
          ```plaintext
          {
              "message": "Books retrieved successfully",
              "data": {
                  "books": [
                      {
                          "id": 1,
                          "title": "test",
                          "author": "jack",
                          "isbn": "9780439559",
                          "quantity": 8,
                          "shelfLocation": "test",
                          "createdAt": "2024-12-02T19:18:03.860Z",
                          "updatedAt": "2024-12-02T19:18:03.860Z"
                      }
                  ],
                  "totalItems": 1,
                  "totalPages": 1,
                  "currentPage": 1
              }
          }
          ```
  - Search Books: GET /books/search?query=jack
      - Response 
          ```plaintext
          {
              "books": [
                  {
                      "id": "10",
                      "title": "Kola",
                      "author": "jack",
                      "isbn": "9780439554"
                  },
                  {
                      "id": "1",
                      "title": "test",
                      "author": "jack",
                      "isbn": "9780439559"
                  }
              ]
          }
          ```
  - Update Book: PUT /books/1
      - Request
        ```plaintext
        {
          "title": "test3",
          "author": "jack",
          "isbn": "9780439559",
          "quantity": 8,
          "shelfLocation": "test"
        }
        ```
      - Response 
          ```plaintext
          {
              "message": "Book updated successfully",
              "book": {
                  "id": 1,
                  "title": "test3",
                  "author": "jack",
                  "isbn": "9780439559",
                  "quantity": 8,
                  "shelfLocation": "test",
                  "createdAt": "2024-12-02T19:18:03.860Z",
                  "updatedAt": "2024-12-02T19:52:23.653Z"
              }
          }
          ``` 
  - Delete Book: DELETE /books/1
      - Response 
          ```plaintext
         {
            "message": "Book deleted successfully"
          }
          ```    
- **Borrower**   
- Register Borrower: POST /borrowers
     - Request
        ```plaintext
        {
            "name": "aya hamed",
            "email": "aya.hamed@gmail.com"
        }
        ```
     - Response 
        ```plaintext
        {
            "message": "Borrower created successfully",
            "borrower": {
                "registeredDate": "2024-12-02T20:04:03.502Z",
                "id": 1,
                "name": "aya hamed",
                "email": "aya.hamed@gmail.com",
                "userId": 9,
                "updatedAt": "2024-12-02T20:04:03.502Z",
                "createdAt": "2024-12-02T20:04:03.502Z"
            }
        }
        ```

  - List Borrowers: GET /borrowers
      - Response 
          ```plaintext
          {
              "borrowers": [
                  {
                      "id": 1,
                      "name": "aya hamed",
                      "email": "aya.hamed@gmail.com",
                      "registeredDate": "2024-12-02T20:04:03.502Z",
                      "userId": 9,
                      "createdAt": "2024-12-02T20:04:03.502Z",
                      "updatedAt": "2024-12-02T20:04:03.502Z"
                  }
              ]
          }
          ```
  - Update Borrower: PUT /borrowers/1
     - Request
        ```plaintext
        {
            "name": "aya hamed",
            "email": "aya.hamed@gmail.com"
        }
        ```
      - Response 
          ```plaintext
          {
              "message": "Borrower updated successfully",
              "borrower": {
                  "id": 1,
                  "name": "aya hamed2",
                  "email": "aya.hamed@gmail.com",
                  "registeredDate": "2024-12-02T20:04:03.502Z",
                  "userId": 9,
                  "createdAt": "2024-12-02T20:04:03.502Z",
                  "updatedAt": "2024-12-02T20:08:55.672Z"
              }
          }
          ```
  - Delete Book: DELETE /borrowers/1
      - Response 
          ```plaintext
        {
            "message": "Borrower deleted successfully"
        }
          ```  

- **Borrowing Process**   
  - Checkout: POST /borrowing
      - Request
          ```plaintext
         {
          "borrowerId": 3,
            "bookId":2,
            "dueDate":"2024-12-03T20:15:03.194Z"
         }
          ```
      - Response 
          ```plaintext
          {
              "message": "Book checked out successfully",
              "record": {
                  "returned": false,
                  "id": 2,
                  "borrowerId": 3,
                  "bookId": 2,
                  "dueDate": "2024-12-03T20:15:03.194Z",
                  "updatedAt": "2024-12-02T20:23:32.831Z",
                  "createdAt": "2024-12-02T20:23:32.831Z"
              }
          }
          ```

   - List Borrower's Book: GET /borrowing/borrower:borrowerId
        - Response 
            ```plaintext
            {
                "borrowerId": "3",
                "books": [
                    {
                        "id": 2,
                        "dueDate": "2024-12-03T20:15:03.194Z",
                        "returned": false,
                        "createdAt": "2024-12-02T20:23:32.831Z",
                        "updatedAt": "2024-12-02T20:23:32.831Z",
                        "borrowerId": 3,
                        "bookId": 2,
                        "Book": {
                            "id": 2,
                            "title": "test",
                            "author": "jack",
                            "isbn": "9780439559",
                            "quantity": 6,
                            "shelfLocation": "test",
                            "createdAt": "2024-12-02T20:21:42.167Z",
                            "updatedAt": "2024-12-02T20:23:32.835Z"
                        }
                    }
                ]
            }
            ```
     - Overdue Books: GET /borrowing/overdue
        - Response 
          ```plaintext
            {
                "overdueBooks": [
                    {
                        "id": 1,
                        "dueDate": "2024-12-02T20:15:03.194Z",
                        "returned": false,
                        "createdAt": "2024-12-02T20:21:56.575Z",
                        "updatedAt": "2024-12-02T20:21:56.575Z",
                        "borrowerId": 2,
                        "bookId": 2,
                        "Book": {
                            "id": 2,
                            "title": "test",
                            "author": "jack",
                            "isbn": "9780439559",
                            "quantity": 5,
                            "shelfLocation": "test",
                            "createdAt": "2024-12-02T20:21:42.167Z",
                            "updatedAt": "2024-12-02T20:30:17.857Z"
                        },
                 
                   }
                          ]
            }
            ```

    - Return Book: POST /borrowing/return
        -  Request
          ```plaintext
          {
            "borrowerId": 2,
            "bookId": 2
          }
          ```

       - Response 
        ```plaintext
      {
      "message": "Book returned successfully",
      "record": {
          "id": 1,
          "dueDate": "2024-12-02T20:15:03.194Z",
          "returned": true,
          "createdAt": "2024-12-02T20:21:56.575Z",
          "updatedAt": "2024-12-02T20:47:19.341Z",
          "borrowerId": 2,
          "bookId": 2
           }
      }
       ```
    - Export Borrowing: GET /borrowing/export/borrowing
       
    - Export Borrowing Overdue: GET /borrowing/export/overdue
    - Export Borrowing between Period to CSV: GET /borrowing/report?startDate=2024-10-11&endDate=2025-10-11
