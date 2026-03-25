import { Router } from 'express';
import { addReview, getReviewsByOfferId } from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// GET /comments/:offerId - получить все отзывы для предложения
router.get('/:offerId', getReviewsByOfferId);

// POST /comments/:offerId - добавить новый отзыв (только для авторизованных)
router.post('/:offerId', authenticateToken, addReview);

export default router;