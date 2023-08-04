// src/controllers/purchaseController.ts
import { Request, Response } from 'express';
import { BookService } from '../service/bookService';
import { BookRepository } from '../repository/bookRepository';
import { User } from '../entity/user';
import { Book } from '../entity/book';
import { UserBook } from '../entity/userBook';

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Book purchase operations
 */

/**
 * @swagger
 * /api/purchase:
 *   post:
 *     summary: Purchase a book
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: The ID of the book to purchase.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the book to purchase.
 *             example:
 *               bookId: 123
 *               quantity: 2
 *     responses:
 *       200:
 *         description: Book purchased successfully
 *       400:
 *         description: Bad request. Invalid book ID or quantity.
 *       404:
 *         description: Book or user not found.
 *       500:
 *         description: Internal server error.
 */

export class PurchaseController {
  static async purchaseBook(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.body.userId);
    const bookId = parseInt(req.body.bookId);

    if (isNaN(userId) || isNaN(bookId)) {
      res.status(400).json({ error: 'Invalid user ID or book ID' });
      return;
    }

    try {
      const user = await User.findByPk(userId);
      const book = await Book.findByPk(bookId);

      if (!user || !book) {
        res.status(404).json({ error: 'User or book not found' });
        return;
      }

      // Check if the user has enough balance to purchase the book
      const bookPrice = book.price;
      if (user.balance < bookPrice) {
        res.status(400).json({ error: 'Insufficient balance to purchase the book' });
        return;
      }

      // Deduct the book price from the user's balance
      user.balance -= bookPrice;

      await user.save();

      // Add the book to the user's collection
      await user.$add('book', book);

      res.json({ message: 'Book purchased successfully' });
    } catch (error) {
      console.error('Error during purchase:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
