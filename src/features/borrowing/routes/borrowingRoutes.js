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
import { USER_ROLES } from '../../../core/auth/constants/userRoles.js';
import authMiddleware from '../../../core/auth/middleware/authMiddleware.js';

const { authorize } = authMiddleware;
const router = express.Router();

router.post('/checkout', checkout);
router.post('/return', returnBorrowedBook);
router.get('/borrower/:borrowerId', listBorrowerBooks);
router.get('/overdue',  authorize([USER_ROLES.ADMIN,USER_ROLES.LIBRARIAN]),listOverdueBooks);
router.get('/report',  authorize([USER_ROLES.ADMIN,USER_ROLES.LIBRARIAN]), getBorrowingReport); 
router.get('/export/overdue', authorize([USER_ROLES.ADMIN,USER_ROLES.LIBRARIAN]), exportOverdueBorrows);
router.get('/export/borrowing',  authorize([USER_ROLES.ADMIN,USER_ROLES.LIBRARIAN]),exportBorrowingProcesses);
export default router;
