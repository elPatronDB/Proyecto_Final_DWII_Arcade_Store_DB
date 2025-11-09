import express from 'express';
import { getCart, addToCart } from '../controllers/cartController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);

export default router;