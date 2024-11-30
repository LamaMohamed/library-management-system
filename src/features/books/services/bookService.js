import logger from '../../../core/logger/logger.js';


import { indexBook, updateBookInIndex, deleteBookFromIndex, searchBooks as elasticSearchBooks } from '../elasticsearch/services/elasticService.js'
import { validateBookData, sanitizeId } from '../validations/validationService.js';

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
    }    await book.destroy();
    await deleteBookFromIndex(bookId);
};

/**
 * Retrieves all books from the database.
 */
export const getBooks = async () => {
    logger.info('Retrieve all books from the database');
    return Book.findAll();
};

/**
 * Searches for books in Elasticsearch.
 */
export const searchBooks = async (query) => {
    return elasticSearchBooks(query);
};

export default {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    searchBooks,
};