import { atom } from 'recoil';

const booksLoading = atom({
  key: 'booksLoading',
  default: false,
});

export { booksLoading };
