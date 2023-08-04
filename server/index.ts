// src/app.ts
import express from 'express';
import { BookController } from './controller/bookController';
import { Book } from './entity/book';
import sequelize from './database';
import cors from 'cors';
import { PurchaseController } from './controller/purchaseController';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = 5000; // Your desired port number

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
  },
  apis: ['./controller/*.ts'],
};

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
sequelize.sync();

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/users', async (req, res) => {
  const users = await Book.findAll();
  res.json(users);
});

// Routes
app.get('/api/books', BookController.getAllBooks);
app.get('/api/book/:id', BookController.getBook);

app.post('/api/purchase', PurchaseController.purchaseBook);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
