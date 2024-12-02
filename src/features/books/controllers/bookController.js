import { asyncHandler } from '../../../core/middleware/errorMiddleware.js';

import bookService from '../services/bookService.js';
import logger from '../../../core/logger/logger.js'

/**
 * Controller to add a new book.
 */
export const createBook = asyncHandler(async (req, res) => {
    const book = await bookService.createBook(req.body);
    logger.info("Add new book");
    res.status(201).json({ message: 'Book created successfully', book });
});


/**
 * Controller to update book details.
 */
export const updateBookDetails = asyncHandler(async (req, res) => {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json({ message: 'Book updated successfully', book });
});

/**
 * Controller to delete a book.
 */
export const deleteBookRecord = asyncHandler(async (req, res) => {
    await bookService.deleteBook(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
});

/**
 * Controller to list paginated books.
 */
export const listBooks = asyncHandler(async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;

    const parsedPage = parseInt(page, 10);
    const parsedPageSize = parseInt(pageSize, 10);

    const books = await bookService.getBooks(parsedPage, parsedPageSize);

    res.status(200).json({
        message: 'Books retrieved successfully',
        data: books,
    });
});

/**
 * Controller to search books.
 */
export const searchBooksByQuery = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const books = await bookService.searchBooks(query);
    res.status(200).json({ books });
};
