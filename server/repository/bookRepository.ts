// src/repositories/bookRepository.ts
import { Book } from '../entity/book';

export class BookRepository {
  static async getAllBooks(offset: number, limit: number): Promise<Book[]> {
    return await Book.findAll({
      offset,
      limit,
      order: [['id', 'ASC']],
    });
  }
  static async getBookById(id: number): Promise<Book | null> {
    return await Book.findByPk(id).then((result) => result);
  }
}
