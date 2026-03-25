import { Router } from "express";
import offerRouter from './offerRoutes.js';
import userRoutes from './userRoutes.js';
import reviewRouter from './reviewRoutes.js';

const router = Router();

router.use('/offers', offerRouter);
router.use('/users', userRoutes);
router.use('/login', userRoutes);
router.use('/comments', reviewRouter);

export default router;