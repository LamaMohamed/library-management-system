import express from 'express';
import {
    createBorrower,
    updateBorrower,
    deleteBorrower,
    listBorrowers
} from '../controllers/borrowerController.js';
import { USER_ROLES } from '../../../core/auth/constants/userRoles.js';

import authMiddleware from '../../../core/auth/middleware/authMiddleware.js';

const { authorize } = authMiddleware;

const router = express.Router();

router.post('/', createBorrower);
router.put('/:id', updateBorrower);
router.delete('/:id', authorize([USER_ROLES.ADMIN]),deleteBorrower);
router.get('/', authorize([USER_ROLES.ADMIN]),listBorrowers);

export default router;
