import express from 'express';
import {
    createBook,
    updateBookDetails,
    deleteBookRecord,
    listBooks,
    searchBooksByQuery,
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', createBook);
router.put('/:id', updateBookDetails);
router.delete('/:id', deleteBookRecord);
router.get('/', listBooks);
router.get('/search', searchBooksByQuery);

export default router;
