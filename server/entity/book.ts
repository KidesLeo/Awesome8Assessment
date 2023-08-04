// src/entities/book.ts
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from './user';
import { UserBook } from './userBook';

@Table
export class Book extends Model<Book> {
  @Column({ allowNull: false })
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  discountRate!: number;

  @Column(DataType.TEXT)
  coverImage!: string;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  price!: number;

  @BelongsToMany(() => User, () => UserBook, 'bookId', 'userId') // Use the same alias 'bookId' used in the UserBook model
  users!: User[];
}
