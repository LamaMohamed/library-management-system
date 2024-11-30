import express from 'express';
import {
    checkout,
    returnBorrowedBook,
    listBorrowerBooks,
    listOverdueBooks,
    getBorrowingReport,
    exportOverdueBorrows,
    exportBorrowingProcesses
} from '../controllers/borrowingController.js';

const router = express.Router();

router.post('/checkout', checkout);
router.post('/return', returnBorrowedBook);
router.get('/borrower/:borrowerId', listBorrowerBooks);
router.get('/overdue', listOverdueBooks);
router.get('/report', getBorrowingReport); 
router.get('/export/overdue', exportOverdueBorrows);
router.get('/export/borrowing', exportBorrowingProcesses);
export default router;
