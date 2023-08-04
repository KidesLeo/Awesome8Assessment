// src/controllers/bookController.ts
import { Request, Response } from 'express';
import { BookService } from '../service/bookService';

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book.
 *           example: Sample Book
 *         description:
 *           type: string
 *           description: The description of the book.
 *           example: This is a sample book
 *         discountRate:
 *           type: number
 *           description: The discount rate of the book (between 1 and 99).
 *           minimum: 1
 *           maximum: 99
 *           example: 10
 *         coverImage:
 *           type: string
 *           description: The URL of the book's cover image.
 *           example: https://example.com/sample-book.jpg
 *         price:
 *           type: number
 *           description: The price of the book.
 *           format: double
 *           example: 19.99
 */

export class BookController {
  /**
   * @swagger
   * tags:
   *   name: Books
   *   description: Book operations
   */

  /**
   * @swagger
   * /api/books:
   *   get:
   *     summary: Get all books
   *     tags: [Books]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           description: The page number.
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: integer
   *           description: The number of books per page.
   *           default: 12
   *     responses:
   *       200:
   *         description: Returns an array of books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Book'
   *       500:
   *         description: Internal server error.
   */

  static async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      // Get the page and pageSize parameters from the query string
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 12;

      const books = await BookService.getAllBooks(page, pageSize);

      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  static async getBook(req: Request, res: Response): Promise<void> {
    /**
     * @swagger
     * /api/books/{id}:
     *   get:
     *     summary: Get a book by ID
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The ID of the book to fetch.
     *     responses:
     *       200:
     *         description: Returns a book
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       404:
     *         description: Book not found.
     *       500:
     *         description: Internal server error.
     */
    try {
      const book = await BookService.getBookById(Number(req.params.id));
      if (book) res.json(book);
      else res.status(404).json({ error: 'Book not found' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
