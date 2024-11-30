import express from 'express';
import {
    createBorrower,
    updateBorrower,
    deleteBorrower,
    listBorrowers
} from '../controllers/borrowerController.js';

const router = express.Router();

router.post('/', createBorrower);
router.put('/:id', updateBorrower);
router.delete('/:id', deleteBorrower);
router.get('/', listBorrowers);

export default router;
