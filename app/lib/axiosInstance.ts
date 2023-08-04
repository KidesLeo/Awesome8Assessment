import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: process.env.NODE_ENV === 'production' ? 5000 : 10000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});
