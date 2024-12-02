import { createBook, updateBookDetails, deleteBookRecord, listBooks, searchBooksByQuery } from '../../../src/features/books/controllers/bookController.js'
import bookService from '../../../src/features/books/services/bookService.js';

// Mock the response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock the request object
const mockRequest = (body = {}, params = {}, query = {}) => ({
    body,
    params,
    query,
});

jest.mock('../services/bookService.js');

describe('Book Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createBook', () => {
        it('should create a new book and return 201 status', async () => {
            const req = mockRequest({ title: 'Test Book', author: 'John Doe' });
            const res = mockResponse();

            const mockBook = { id: 1, title: 'Test Book', author: 'John Doe' };
            bookService.createBook.mockResolvedValue(mockBook);

            await createBook(req, res);

            expect(bookService.createBook).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Book created successfully',
                book: mockBook,
            });
        });
    });

    describe('updateBookDetails', () => {
        it('should update book details and return 200 status', async () => {
            const req = mockRequest({ title: 'Updated Book' }, { id: '1' });
            const res = mockResponse();

            const mockUpdatedBook = { id: 1, title: 'Updated Book', author: 'John Doe' };
            bookService.updateBook.mockResolvedValue(mockUpdatedBook);

            await updateBookDetails(req, res);

            expect(bookService.updateBook).toHaveBeenCalledWith('1', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Book updated successfully',
                book: mockUpdatedBook,
            });
        });
    });

    describe('deleteBookRecord', () => {
        it('should delete a book and return 200 status', async () => {
            const req = mockRequest({}, { id: '1' });
            const res = mockResponse();

            bookService.deleteBook.mockResolvedValue();

            await deleteBookRecord(req, res);

            expect(bookService.deleteBook).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Book deleted successfully',
            });
        });
    });

    describe('listBooks', () => {
        it('should list books with pagination and return 200 status', async () => {
            const req = mockRequest({}, {}, { page: '1', pageSize: '5' });
            const res = mockResponse();

            const mockBooks = [
                { id: 1, title: 'Book 1', author: 'Author 1' },
                { id: 2, title: 'Book 2', author: 'Author 2' },
            ];
            bookService.getBooks.mockResolvedValue(mockBooks);

            await listBooks(req, res);

            expect(bookService.getBooks).toHaveBeenCalledWith(1, 5);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Books retrieved successfully',
                data: mockBooks,
            });
        });
    });

    describe('searchBooksByQuery', () => {
        it('should return books matching the query', async () => {
            const req = mockRequest({}, {}, { query: 'Test' });
            const res = mockResponse();

            const mockSearchResults = [
                { id: 1, title: 'Test Book', author: 'John Doe' },
            ];
            bookService.searchBooks.mockResolvedValue(mockSearchResults);

            await searchBooksByQuery(req, res);

            expect(bookService.searchBooks).toHaveBeenCalledWith('Test');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                books: mockSearchResults,
            });
        });

        it('should return 400 if query is missing', async () => {
            const req = mockRequest({}, {}, {});
            const res = mockResponse();

            await searchBooksByQuery(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Query parameter is required',
            });
        });
    });
});
