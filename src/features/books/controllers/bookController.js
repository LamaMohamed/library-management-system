import { asyncHandler } from '../../../core/middleware/errorMiddleware.js';

import bookService from '../services/bookService.js';

/**
 * Controller to create a new borrower.
 */
export const createBook = asyncHandler(async (req, res) => {
    const book = await bookService.createBook(req.body);
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
 * Controller to list all books.
 */
export const listBooks = asyncHandler(async (req, res) => {
    const books = await bookService.getBooks();
    res.status(200).json({ books });
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
// export const searchBooksByQuery = asyncHandler(async (req, res) => {
//     const books = await searchBooks(req.query);
//     res.status(200).json(books);
// });
