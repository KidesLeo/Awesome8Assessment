// populateDb.ts
import { Book } from './entity/book';
import sequelize from './database';
import fs from 'fs';
import { fa, faker } from '@faker-js/faker';

async function populateDb() {
  try {
    // Sync the models with the database
    await sequelize.sync({ force: false });

    // Generate mock books
    const count = 40; // Change the number as per your requirement
    const mockBooks = generateMockBooks(count);

    // Bulk insert the mock books into the database
    await Book.bulkCreate(mockBooks);

    console.log('Mock books inserted successfully.');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

function generateMockBooks(count: number): any[] {
  const mockBooks = [];
  for (let i = 0; i < count; i++) {
    mockBooks.push({
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      type: faker.word.adjective(),
      discountRate: faker.number.int({ min: 1, max: 99 }),
      coverImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
      price: faker.commerce.price(),
    });
  }
  return mockBooks;
}

populateDb();
