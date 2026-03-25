import { Router } from 'express';
import { registration, login, checkAuth, logout } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = Router();

console.log('userRoutes.js loaded'); // Добавьте эту строку

// Регистрация
router.post('/registration', upload.single('avatar'), registration);

// Логин
router.post('/login', (req, res, next) => {
    console.log('Login route hit in router');
    login(req, res, next);
});

// Проверка авторизации
router.get('/login', authenticateToken, checkAuth);

// Выход
router.delete('/logout', authenticateToken, logout);

// Для отладки
router.get('/test', (req, res) => {
    console.log('Test route hit in router');
    res.json({ message: 'User routes working' });
});

export default router;