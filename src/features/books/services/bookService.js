import logger from '../../../core/logger/logger.js';


import { indexBook, updateBookInIndex, deleteBookFromIndex, searchBooks as elasticSearchBooks } from './elasticsearch/bookElasticService.js'
import { getCache, setCache, deleteCache } from '../../../core/services/redis.js';

import { validateBookData, sanitizeId } from '../validations/validationService.js';
import { BOOKS_CACHE_KEY } from '../constants/constants.js';

import Book from '../models/Book.js';


/**
 * Adds a new book to the database and indexes it in Elasticsearch.
 */
export const createBook = async (bookData) => {
    const validatedData = validateBookData(bookData);

    const book = await Book.create(validatedData);
    logger.info('Book created in the database', { bookId: book.id });

    await indexBook(book);
    logger.info('Book indexed in Elasticsearch', { bookId: book.id });

    await invalidateBooksCache();
    logger.info('Books cache updated in Redis');

    return book;
};

/**
 * Updates a book's details in the database.
 */
export const updateBook = async (bookId, updtedBookData) => {
    const sanitizedBookId = sanitizeId(bookId);

    const book = await Book.findByPk(sanitizedBookId);
    if (!book) {
        logger.warn('Book not found for update', { bookId });
        throw new Error('Book not found');
    }

    const validatedData = validateBookData(updtedBookData);

    await book.update(validatedData);
    logger.info('Book updated in the database', { bookId });
     
    await updateBookInIndex(book);
    logger.info('Book updated in Elasticsearch', { bookId: book.id });

    await invalidateBooksCache();
    logger.info('Books cache updated in Redis');

    return book;
};

/**
 * Deletes a book from the database and its index from Elasticsearch.
 */
export const deleteBook = async (bookId) => {
    const book = await Book.findByPk(bookId);
    if (!book) {
        logger.warn('Book not found for deletion', { bookId });
        throw new Error('Book not found');
    }    
    await book.destroy();
    await deleteBookFromIndex(bookId);
    logger.info('Book index deleted in Elasticsearch', { bookId: book.id });

    await invalidateBooksCache();
    logger.info('Books cache updated in Redis');

};

/**
 * Retrieves a paginated list of books from the database or cache.
 */
export const getBooks = async (page = 1, pageSize = 10) => {
    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;

    // Create a composite cache key
    const cacheKey = `${BOOKS_CACHE_KEY}_${page}_${pageSize}`;

    // Check if the paginated data is in the cache
    const cachedBooks = await getCache(cacheKey);
    if (cachedBooks) {
        logger.info(`Books for page ${page} retrieved from cache`);
        return cachedBooks;
    }

    // Fetch paginated results from the database
    const books = await Book.findAndCountAll({
        limit: pageSize,
        offset,
    });
    logger.info(`Books for page ${page} retrieved from the database`);

    // Store the paginated results in the cache
    await setCache(cacheKey, books, 3600);

    // Return books with pagination metadata
    return {
        books: books.rows,
        totalItems: books.count,
        totalPages: Math.ceil(books.count / pageSize),
        currentPage: page,
    };
};


/**
 * Searches for books in Elasticsearch.
 */
export const searchBooks = async (query) => {
    return elasticSearchBooks(query);
};

/**
 * Invalidates the cache when the book list is updated.
 */
export const invalidateBooksCache = async () => {
    await deleteCache(BOOKS_CACHE_KEY);
    logger.info('Books cache invalidated');
};

export default {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    searchBooks,
};