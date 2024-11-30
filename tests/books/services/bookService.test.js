import bookService from '../../../src/features/books/services/bookService.js';
import Book from '../../../src/features/books/models/Book.js';

// Mock Sequelize model
jest.mock('../../../src/core/database/models/Book.js');

describe('Book Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createBook should create a new book', async () => {
        const mockBookData = { title: 'Test Book', author: 'Author', isbn: '123456', quantity: 5 };
        const createdBook = { id: 1, ...mockBookData };

        Book.create.mockResolvedValue(createdBook);

        const result = await bookService.createBook(mockBookData);

        expect(Book.create).toHaveBeenCalledWith(mockBookData);
        expect(result).toEqual(createdBook);
    });

    test('getBooks should return a list of books', async () => {
        const books = [{ id: 1, title: 'Book1' }, { id: 2, title: 'Book2' }];
        Book.findAll.mockResolvedValue(books);

        const result = await bookService.getBooks();

        expect(Book.findAll).toHaveBeenCalled();
        expect(result).toEqual(books);
    });
});
