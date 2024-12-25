import express from 'express';
import { getBooks, createBook, getBookById, getBooksByUserEmail, deleteBook, updateBook } from '../controllers/bookController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to get all books
router.get('/', getBooks);

// POST route to add a new book
router.post('/', createBook);
router.get('/:bookId', getBookById);
router.get('/user/:email', getBooksByUserEmail);

router.delete('/:id', requireSignIn, deleteBook);

router.put('/:id', requireSignIn, updateBook);

export default router;
