import { createBook, listBooks } from '../../../src/features/books/controllers/bookController.js';
import bookService from '../../../src/features/books/services/bookService.js';

// Mock the service layer
jest.mock('../../../src/features/books/services/bookService.js');

describe('Book Controller', () => {
    let mockRes, mockNext;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    test('createBook should return 201 with the created book', async () => {
        const mockReq = { body: { title: 'Test Book', author: 'Author', isbn: '123456' } };
        const mockBook = { id: 1, ...mockReq.body };

        bookService.createBook.mockResolvedValue(mockBook);

        createBook(mockReq, mockRes, mockNext);

        expect(bookService.createBook).toHaveBeenCalledWith(mockReq.body);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Book created successfully', book: mockBook });
    });

    test('listBooks should return 200 with a list of books', async () => {
        const mockBooks = [{ id: 1, title: 'Book1' }, { id: 2, title: 'Book2' }];
        bookService.getBooks.mockResolvedValue(mockBooks);

        const mockReq = {};

        listBooks(mockReq, mockRes, mockNext);

        expect(bookService.getBooks).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ books: mockBooks });
    });
});
