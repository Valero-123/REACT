import { createReducer } from '@reduxjs/toolkit'; 
import { 
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
} from './action'; 
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { getCity } from '../utils';
import { AuthorizationStatusType } from '../types/authorization-status';
import { CityOffer, FullOffer, OffersList } from '../types/offer';
import { UserData } from '../types/user-data';
import { Review } from '../types/reviews';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
    // Основные данные
    city: CityOffer | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    isOffersDataLoading: boolean;
    user: UserData | null;
    
    // Данные для детальной страницы offer
    currentOffer: FullOffer | null;
    isOfferLoading: boolean;
    reviews: Review[];
    isReviewsLoading: boolean;
    nearbyOffers: OffersList[];
}

const initialState: InitialState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: AuthorizationStatus.Unknown,
    error: null,
    isOffersDataLoading: false,
    user: null,
    currentOffer: null,
    isOfferLoading: false,
    reviews: [],
    isReviewsLoading: false,
    nearbyOffers: []
};

const reducer = createReducer(initialState, (builder) => {
    builder
        // Город и предложения
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(offersCityList, (state, action) => {
    console.log('Старые данные:', state.offers.map(o => ({ id: o.id, isFavorite: o.isFavorite })));
    console.log('Новые данные:', action.payload.map(o => ({ id: o.id, isFavorite: o.isFavorite })));
    state.offers = action.payload;
})
        
        // Авторизация
        .addCase(requireAuthorization, (state, action) => {
            state.authorizationStatus = action.payload;
            if (action.payload === AuthorizationStatus.NoAuth) {
                state.user = null;
            }
        })
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })
        
        // Ошибки и загрузка
        .addCase(setError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(setOffersDataLoadingStatus, (state, action) => {
            state.isOffersDataLoading = action.payload;
        })
        
        // Детальная страница offer
        .addCase(setCurrentOffer, (state, action) => {
            state.currentOffer = action.payload;
        })
        .addCase(setOfferLoadingStatus, (state, action) => {
            state.isOfferLoading = action.payload;
        })
        .addCase(setReviews, (state, action) => {
            state.reviews = action.payload;
        })
        .addCase(setReviewsLoadingStatus, (state, action) => {
            state.isReviewsLoading = action.payload;
        })
        .addCase(setNearbyOffers, (state, action) => {
            state.nearbyOffers = action.payload;
        });
});

export { reducer };