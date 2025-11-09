import express from 'express';
import { getGames, getGameById, createGame, updateGame, deleteGame } from '../controllers/gameController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGameById);
router.post('/', auth, adminAuth, createGame);
router.put('/:id', auth, adminAuth, updateGame);
router.delete('/:id', auth, adminAuth, deleteGame);

export default router;


