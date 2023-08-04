// src/database.ts
import { Sequelize } from 'sequelize-typescript';
import { Book } from './entity/book';
import { configDotenv } from 'dotenv';
import dotenv from 'dotenv';
import { User } from './entity/user';
import { UserBook } from './entity/userBook';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'postgres',
  username: 'postgres',
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432, // Your Supabase database port
  models: [User, UserBook, Book],
});

export default sequelize;
