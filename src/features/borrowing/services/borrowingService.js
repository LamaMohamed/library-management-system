import Borrowing from '../models/Borrowing.js';
import Book from '../../books/models/Book.js';
import Borrower from '../../borrowers/models/Borrower.js';
import { Parser as Json2CsvParser } from 'json2csv';
import { Op } from 'sequelize';

/**
 * Handles the checkout process for a book.
 */
export const checkoutBook = async ({ borrowerId, bookId, dueDate }) => {
    const book = await Book.findByPk(bookId);
    if (!book || book.quantity < 1) throw new Error('Book not available');

    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) throw new Error('Borrower not found');

    const record = await Borrowing.create({ borrowerId, bookId, dueDate });
    await book.update({ quantity: book.quantity - 1 });

    return record;
};


/**
 * Handles the return process for a book.
 */
export const returnBook = async ({ borrowerId, bookId }) => {
    const record = await Borrowing.findOne({ where: { borrowerId, bookId, returned: false } });
    if (!record) throw new Error('No active borrowing record found');

    await record.update({ returned: true });

    const book = await Book.findByPk(bookId);
    if (book) await book.update({ quantity: book.quantity + 1 });

    return record;
};

/**
 * Retrieves all books currently borrowed by a borrower.
 */
export const getBorrowerBooks = async (borrowerId) => {
    return await Borrowing.findAll({
        where: { borrowerId, returned: false },
        include: [Book],
    });
};

/**
 * Retrieves a list of overdue books.
 */
export const getOverdueBooks = async () => {
    const now = new Date();
    return Borrowing.findAll({
        where: { returned: false, dueDate: { $lt: now } },
        include: [Book, Borrower],
    });
};


/**
 * Retrieves borrowing processes within a specific period.
 */
export const getBorrowingProcessesInPeriod = async (startDate, endDate) => {
    return await Borrowing.findAll({
        where: {
            createdAt: { [Op.between]: [startDate, endDate] },
        },
        include: [Book, Borrower],
    });
};

/**
 * Retrieves overdue borrows within the last month.
 */
export const getOverdueBorrowsLastMonth = async () => {
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return await Borrowing.findAll({
        where: {
            returned: false,
            dueDate: { [Op.between]: [lastMonth, now] },
        },
        include: [Book, Borrower],
    });
};

/**
 * Converts borrowing data to CSV format.
 */
export const exportToCsv = (data) => {
    const fields = ['id', 'borrower.name', 'borrower.email', 'book.title', 'book.author', 'dueDate', 'returned'];
    const opts = { fields };
    const parser = new Json2CsvParser(opts);
    return parser.parse(data.map((record) => ({
        id: record.id,
        'borrower.name': record.Borrower.name,
        'borrower.email': record.Borrower.email,
        'book.title': record.Book.title,
        'book.author': record.Book.author,
        dueDate: record.dueDate,
        returned: record.returned,
    })));
};

export default {
    checkoutBook,
    returnBook,
    getBorrowerBooks,
    getOverdueBooks,
    getBorrowingProcessesInPeriod,
    getOverdueBorrowsLastMonth,
    exportToCsv,
};