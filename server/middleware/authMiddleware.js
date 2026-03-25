import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';
import {User} from '../models/user.js';

const authenticateToken = async (req, res, next) => {
 try {
   const authHeader = req.headers.authorization;
   
   console.log('Auth header:', authHeader); // Для отладки

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
     console.log('No Bearer token provided');
     return next(ApiError.unauthorized('Нет токена'));
   }

   const token = authHeader.split(' ')[1];
   console.log('Token received:', token ? token.substring(0, 20) + '...' : 'missing');
   
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log('Decoded token:', decoded);

   const user = await User.findByPk(decoded.id);
   if (!user) {
     console.log('User not found for id:', decoded.id);
     return next(ApiError.unauthorized('Пользователь не найден'));
   }

   req.user = user;
   next();
 } catch (error) {
   console.error('Auth error:', error.message);
   next(ApiError.unauthorized('Недействительный токен'));
 }
};

export { authenticateToken };