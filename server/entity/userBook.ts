// src/entities/userBook.ts
import { Table, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';
import { Book } from './book';

@Table
export class UserBook extends Model<UserBook> {
  @ForeignKey(() => User)
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'ownerUser' }) // Specify custom name for the foreign key and the association alias
  ownerUser!: User;

  @ForeignKey(() => Book)
  @BelongsTo(() => Book, { foreignKey: 'bookId' })
  book!: Book;
}
