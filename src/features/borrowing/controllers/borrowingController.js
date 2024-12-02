import { asyncHandler } from '../../../core/middleware/errorMiddleware.js';
import borrowingService from '../services/borrowingService.js';

/**
 * Controller to handle book checkout.
 */
export const checkout = asyncHandler(async (req, res) => {
    console.log(req.user.email)
    const record = await borrowingService.checkoutBook(req.body);
    res.status(201).json({ message: 'Book checked out successfully', record });
});

/**
 * Controller to handle book return.
 */
export const returnBorrowedBook = asyncHandler(async (req, res) => {
    const record = await borrowingService.returnBook(req.body);
    res.status(200).json({ message: 'Book returned successfully', record });
});

/**
 * Controller to list all books currently borrowed by a borrower.
 */
export const listBorrowerBooks = asyncHandler(async (req, res) => {
    const books = await borrowingService.getBorrowerBooks(req.params.borrowerId);
    res.status(200).json({ borrowerId: req.params.borrowerId, books });
});

/**
 * Controller to list all overdue books.
 */
export const listOverdueBooks = asyncHandler(async (req, res) => {
    const overdueBooks = await borrowingService.getOverdueBooks();
    res.status(200).json({ overdueBooks });
});

/**
 * Retrieves borrowing processes in a specific period.
 */
export const getBorrowingReport = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const borrowingData = await borrowingService.getBorrowingProcessesInPeriod(new Date(startDate), new Date(endDate));
    
    const csvData = borrowingService.exportToCsv(borrowingData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="borrowimg_report.csv"');
    res.send(csvData);
});

/**
 * Exports overdue borrows of the last month to CSV
 */
export const exportOverdueBorrows = asyncHandler(async (req, res) => {

    const overdueBorrows = await borrowingService.getOverdueBorrowsLastMonth();
    res.status(200).json({ data: overdueBorrows });
});

/**
 * Exports borrowing processes of the last month
 */
export const exportBorrowingProcesses = asyncHandler(async (req, res) => {

    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const borrowingData = await borrowingService.getBorrowingProcessesInPeriod(lastMonth, now);
    res.status(200).json({ data: borrowingData });
});