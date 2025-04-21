# Book API - RESTful CRUD Service

A simple Node.js/Express API for managing a collection of books


## Features

- **CRUD Operations**:
  - Create, read, update, and delete books
- **In-memory storage** (no database required)
- **Validation**:
  - Required fields (`title`, `author`)
  - Auto-generated `id`
- **Error Handling**:
  - 400 for invalid requests
  - 404 for non-existent books
- **Swagger UI** at `/swagger-ui.html`


## Technology Stack

- Node.js v18+
- Express
- Swagger UI Express
- Swagger JSDoc


## API Endpoints

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| POST   | `/books`       | Create a new book                    |
| GET    | `/books`       | Get all books                        |
| GET    | `/books/{id}`  | Get a single book by ID              |
| PUT    | `/books/{id}`  | Update a book by ID                  |
| DELETE | `/books/{id}`  | Delete a book by ID                  |

## Book Entity

```json
{
  "id": 1,
  "title": "The Innovators",
  "author": "Walter Isaacson",
  "publishedYear": 2014
}
```

# Setup Instructions

## 1. Clone the Repository
```bash
git clone https://github.com/fkdecampo/books-api.git
cd books-api
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Start the Server
```bash
node app.js
```

## 4. Access the API
API Base URL: http://localhost:3000
Swagger Documentation: http://localhost:3000/api-docs  

# Example Requests (Windows CMD)

### Create a Book using (POST)
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Catch-22\",\"author\":\"Joseph Heller\",\"publishedYear\":1961}" http://localhost:3000/books
```

### Get all Books (GET)
```bash
curl http://localhost:3000/books
```

### Get a Specific Book (GET)
```bash
curl http://localhost:3000/books/1
```

### Update a Book (PUT)
```bash
curl -X PUT -H "Content-Type: application/json" -d "{\"title\":\"Catch-22 (50th Anniversary Edition)\",\"author\":\"Joseph Heller\"}" http://localhost:3000/books/1
```
### Delete a Book (DELETE)
```bash
curl -X DELETE http://localhost:3000/books/1
```
### Missing Required Fields ERROR
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"author\":\"Tim Winton\"}" http://localhost:3000/books
```
### Nonexistent Book Error
```bash
curl http://localhost:3000/books/555
```
