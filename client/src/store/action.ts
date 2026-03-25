import { createAction } from "@reduxjs/toolkit";
import { CityOffer, FullOffer, OffersList } from "../types/offer";
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';
import { Review } from '../types/reviews';

const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({payload: city}));
const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({payload: offers}));

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');
const setError = createAction('setError', (error: string | null) =>({payload: error}));
const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

// Новые actions для пользователя
const setUser = createAction<UserData | null>('user/setUser');

// Новые actions для детальной страницы offer
const setCurrentOffer = createAction<FullOffer | null>('offer/setCurrentOffer');
const setOfferLoadingStatus = createAction<boolean>('offer/setOfferLoadingStatus');
const setReviews = createAction<Review[]>('offer/setReviews');
const setReviewsLoadingStatus = createAction<boolean>('offer/setReviewsLoadingStatus');
const setNearbyOffers = createAction<OffersList[]>('offer/setNearbyOffers');

export { 
    changeCity, 
    offersCityList, 
    requireAuthorization, 
    setError, 
    setOffersDataLoadingStatus,
    setUser,
    setCurrentOffer,
    setOfferLoadingStatus,
    setReviews,
    setReviewsLoadingStatus,
    setNearbyOffers
};