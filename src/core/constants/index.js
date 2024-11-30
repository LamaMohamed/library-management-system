import dotenv from 'dotenv';

dotenv.config();

export const BASE_API_URL = process.env.BASE_API_URL || '/api';
export const LOG_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DEFAULT_PAGE_SIZE = 10;

export const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User not found.',
    BOOK_NOT_AVAILABLE: 'Book is currently not available.',
};
