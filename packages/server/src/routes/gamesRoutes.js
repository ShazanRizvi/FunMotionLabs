import express from 'express';
import gamesController from '../controllers/gamesController.js';
import { upload } from '../lib/uploadMiddleware.js';

const router = express.Router();

const gameUploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'cardImageUrl', maxCount: 1 },
  { name: 'bannerImageUrl', maxCount: 1 },
  { name: 'heroVideoUrls', maxCount: 20 },
  { name: 'heroVideoUrls[]', maxCount: 20 },
  { name: 'detailImageUrls', maxCount: 20 },
  { name: 'detailImageUrls[]', maxCount: 20 }
]);

router.get('/games', gamesController.getGames);
router.get('/games/:id', gamesController.getGameById);
router.post('/games/create', gameUploadFields, gamesController.createGame);
router.put('/games/update/:id', gameUploadFields, gamesController.updateGame);
router.delete('/games/delete/:id', gamesController.deleteGame);

export default router;
