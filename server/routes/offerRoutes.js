import { Router } from 'express';
import { 
    getOffers, 
    getOfferById, 
    getNearbyOffers,
    getFavoriteOffers,
    createOffer,
    toggleFavorite 
} from '../controllers/offerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = Router();

// Публичные маршруты
router.get('/', getOffers);
router.get('/:id', getOfferById);
router.get('/:id/nearby', getNearbyOffers);

// Защищенные маршруты (требуют авторизации)
router.get('/favorites', authenticateToken, getFavoriteOffers);
router.post('/', authenticateToken, upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 20 }
]), createOffer);
router.post('/:offerId/:status', authenticateToken, toggleFavorite);

export default router;