// src/entities/user.ts
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Book } from './book';
import { UserBook } from './userBook';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false })
  name!: string;

  @Column({ type: DataType.DOUBLE, defaultValue: 0.0 }) // Add a default value of 0.0 for the balance
  balance!: number;

  @BelongsToMany(() => Book, () => UserBook, 'userId', 'bookId') // Use the same alias 'userId' used in the UserBook model
  books!: Book[];
}
