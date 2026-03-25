import { State } from '../types/state';
import { AuthorizationStatusType } from '../types/authorization-status';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';
import { FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/reviews';

// Статус авторизации
export const getAuthorizationStatus = (state: State): AuthorizationStatusType =>
  state.authorizationStatus;

export const getIsAuth = (state: State): boolean => 
  state.authorizationStatus === AuthorizationStatus.Auth;

export const getIsAuthUnknown = (state: State): boolean => 
  state.authorizationStatus === AuthorizationStatus.Unknown;

// Пользователь
export const getUser = (state: State): UserData | null => state.user;
export const getUserEmail = (state: State): string | null => state.user?.email || null;
export const getUserAvatar = (state: State): string | null => state.user?.avatarUrl || null;

// Загрузка данных
export const getIsOffersDataLoading = (state: State): boolean => state.isOffersDataLoading;
export const getError = (state: State): string | null => state.error;

// Данные для детальной страницы offer
export const getCurrentOffer = (state: State): FullOffer | null => state.currentOffer;
export const getIsOfferLoading = (state: State): boolean => state.isOfferLoading;
export const getReviews = (state: State): Review[] => state.reviews;
export const getIsReviewsLoading = (state: State): boolean => state.isReviewsLoading;
export const getNearbyOffers = (state: State): OffersList[] => state.nearbyOffers;