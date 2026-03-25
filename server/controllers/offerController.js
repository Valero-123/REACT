import { adaptOfferToClient, adaptFullOfferToClient } from "../adapters/offerAdapter.js";
import ApiError from "../error/ApiError.js";
import { Offer } from "../models/offer.js";
import { User } from "../models/user.js";
import { Op } from 'sequelize';

// Получить все предложения
async function getOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        console.error('Не удалось получить список предложений:', error);
        next(ApiError.internal('Не удалось получить список предложений'));
    }
}

// Получить предложение по ID
async function getOfferById(req, res, next) {
    try {
        const { id } = req.params;
        const offer = await Offer.findByPk(id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'email', 'avatar', 'userType']
            }]
        });

        if (!offer) {
            return next(ApiError.notFound('Предложение не найдено'));
        }

        const adaptedOffer = adaptFullOfferToClient(offer, offer.author);
        res.json(adaptedOffer);
    } catch (error) {
        console.error('Ошибка при получении предложения:', error);
        next(ApiError.internal('Ошибка при получении предложения'));
    }
}

// Получить ближайшие предложения
async function getNearbyOffers(req, res, next) {
    try {
        const { id } = req.params;
        const offers = await Offer.findAll({
            where: {
                id: { [Op.ne]: id } // не равно текущему id
            },
            limit: 3
        });
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.json(adaptedOffers);
    } catch (error) {
        console.error('Ошибка при получении ближайших предложений:', error);
        next(ApiError.internal('Ошибка при получении ближайших предложений'));
    }
}

// Получить избранные предложения
async function getFavoriteOffers(req, res, next) {
    try {
        const offers = await Offer.findAll({
            where: { isFavorite: true }
        });
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        next(ApiError.internal('Не удалось получить список предложений'));
    }
}

// Создать предложение
async function createOffer(req, res, next) {
    try {
        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude, userId
        } = req.body;

        if (!req.files?.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
        }

        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;

        let processedPhotos = [];
        if (req.files?.photos) {
            processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
        }

        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch {
                parsedFeatures = features.split(',');
            }
        }

        const offer = await Offer.create({
            title,
            description,
            publishDate,
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium,
            isFavorite,
            rating,
            type,
            rooms,
            guests,
            price,
            features: parsedFeatures,
            commentsCount,
            latitude,
            longitude,
            authorId: userId
        });

        return res.status(201).json(offer);
    } catch (error) {
        next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
    }
}

// Переключить избранное
async function toggleFavorite(req, res, next) {
    try {
        const { offerId } = req.params;
        const { status } = req.body;
        
        console.log('Toggle favorite:', { offerId, status });
        
        const offer = await Offer.findByPk(offerId);
        
        if (!offer) {
            return next(ApiError.notFound('Предложение не найдено'));
        }
        
        // Обновляем статус
        offer.isFavorite = status;
        await offer.save();
        
        console.log('Offer updated:', { id: offer.id, isFavorite: offer.isFavorite });
        
        // Возвращаем обновленное предложение
        res.json(offer);
    } catch (error) {
        console.error('Error toggling favorite:', error);
        next(ApiError.internal('Ошибка при обновлении статуса избранного'));
    }
}

export {
    getOffers,
    getOfferById,
    getNearbyOffers,
    getFavoriteOffers,
    createOffer,
    toggleFavorite
};