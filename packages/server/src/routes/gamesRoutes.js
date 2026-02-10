import express from 'express';
import gamesController from '../controllers/gamesController.js';

const router = express.Router();

router.get('/games', gamesController.getGames);
router.get('/games/:id', gamesController.getGameById);
router.post('/games/create', gamesController.createGame);
router.put('/games/update/:id', gamesController.updateGame);
router.delete('/games/delete/:id', gamesController.deleteGame);

export default router;
