import express from 'express';
import {
    createBook,
    updateBookDetails,
    deleteBookRecord,
    listBooks,
    searchBooksByQuery,
} from '../controllers/bookController.js';
import { USER_ROLES } from '../../../core/auth/constants/userRoles.js';

import authMiddleware from '../../../core/auth/middleware/authMiddleware.js';

const { authorize } = authMiddleware;
const router = express.Router();

router.post('/', authorize([USER_ROLES.ADMIN,USER_ROLES.LIBRARIAN]),createBook);
router.put('/:id', authorize([USER_ROLES.ADMIN,USER_ROLES.LIBRARIAN]),updateBookDetails);
router.delete('/:id', authorize([USER_ROLES.ADMIN,USER_ROLES.LIBRARIAN]),deleteBookRecord);
router.get('/', listBooks);
router.get('/search', searchBooksByQuery);

export default router;
