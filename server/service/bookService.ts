// src/services/bookService.ts
import { Book } from '../entity/book';
import { BookRepository } from '../repository//bookRepository';

export class BookService {
  static async getAllBooks(page: number, pageSize: number): Promise<Book[]> {
    const offset = (page - 1) * pageSize;
    return BookRepository.getAllBooks(offset, pageSize);
  }
  static async getBookById(id: number): Promise<Book | null> {
    return BookRepository.getBookById(id);
  }
}
