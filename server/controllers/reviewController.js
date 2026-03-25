import { adaptReviewToClient } from "../adapters/reviewAdapter.js";
import Review from "../models/review.js";
import { User } from "../models/user.js";
import ApiError from "../error/ApiError.js";

// Получить отзывы по ID предложения
const getReviewsByOfferId = async (req, res, next) => {
    try {
        const { offerId } = req.params;
        
        console.log('Getting reviews for offer:', offerId);
        
        const reviews = await Review.findAll({
            where: { OfferId: offerId },
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'email', 'avatar', 'userType']
            }],
            order: [['publishDate', 'DESC']]
        });

        const adaptedReviews = reviews.map(adaptReviewToClient);
        res.json(adaptedReviews);
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
        next(ApiError.internal('Ошибка при получении комментариев'));
    }
};

// Добавить отзыв
const addReview = async (req, res, next) => {
    try {
        const { comment, rating } = req.body;
        const { offerId } = req.params;
        const userId = req.user.id;

        console.log('Adding review:', { comment, rating, offerId, userId });

        if (!comment || !rating || !offerId) {
            return next(ApiError.badRequest('Не хватает данных для комментария'));
        }

        if (rating < 1 || rating > 5) {
            return next(ApiError.badRequest('Рейтинг должен быть от 1 до 5'));
        }

        if (comment.length < 5 || comment.length > 1024) {
            return next(ApiError.badRequest('Комментарий должен быть от 5 до 1024 символов'));
        }

        const review = await Review.create({
            text: comment,
            rating,
            authorId: userId,
            OfferId: offerId,
            publishDate: new Date()
        });

        // Получаем созданный отзыв с данными автора
        const reviewWithAuthor = await Review.findByPk(review.id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'email', 'avatar', 'userType']
            }]
        });

        const adaptedReview = adaptReviewToClient(reviewWithAuthor);
        res.status(201).json(adaptedReview);
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        next(ApiError.badRequest('Ошибка при добавлении комментария: ' + error.message));
    }
};

export { addReview, getReviewsByOfferId };