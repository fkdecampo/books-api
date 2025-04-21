// importing technology stack
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Temporary in-memory "database" for books
let books = [];
let nextId = 1;

// Validation function for book creation and updates
function validateBook(book) {
    if (!book.title?.trim() || !book.author?.trim()) {
      throw new Error('Title and author are required');
    }
    return {
      id: book.id || nextId++,
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear || null,
    };
  }


// Endpoints
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Invalid input
 */
app.post('/books', (req, res) => {
    try {
      const newBook = validateBook(req.body);
      books.push(newBook);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
app.get('/books', (req, res) => {
    res.json(books);
  });

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  });

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 */
app.put('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Book not found' });
  
    try {
      const updatedBook = validateBook({ ...req.body, id: parseInt(req.params.id) });
      books[index] = updatedBook;
      res.json(updatedBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Book not found' });
    books.splice(index, 1);
    res.status(204).send();
  });


// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API',
      version: '1.0.0',
      description: 'API for managing books',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./app.js'], // Files to scan for Swagger docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/swagger-ui.html', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes will be added here
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/swagger-ui.html`);
});