import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/reviews';
import { APIRoute } from '../const';
import { 
    setCurrentOffer, 
    setOfferLoadingStatus,
    setReviews,
    setReviewsLoadingStatus,
    setNearbyOffers,
    setError
} from './action';
import { fetchOffersAction } from './api-action';

const fetchOfferAction = createAsyncThunk<
    void,
    string,
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'offer/fetchOffer',
    async (offerId, { dispatch, extra: api }) => {
        try {
            dispatch(setOfferLoadingStatus(true));
            const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
            dispatch(setCurrentOffer(data));
            dispatch(setOfferLoadingStatus(false));
        } catch (error) {
            dispatch(setOfferLoadingStatus(false));
            dispatch(setError('Failed to load offer'));
        }
    }
);

const fetchReviewsAction = createAsyncThunk<
    void,
    string,
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'offer/fetchReviews',
    async (offerId, { dispatch, extra: api }) => {
        try {
            dispatch(setReviewsLoadingStatus(true));
            const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
            dispatch(setReviews(data));
            dispatch(setReviewsLoadingStatus(false));
        } catch (error) {
            dispatch(setReviewsLoadingStatus(false));
            dispatch(setReviews([]));
        }
    }
);

const fetchNearbyOffersAction = createAsyncThunk<
    void,
    string,
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'offer/fetchNearbyOffers',
    async (offerId, { dispatch, extra: api }) => {
        try {
            const { data } = await api.get<OffersList[]>(`${APIRoute.Offers}/${offerId}/nearby`);
            dispatch(setNearbyOffers(data.slice(0, 3)));
        } catch (error) {
            try {
                const { data } = await api.get<OffersList[]>(APIRoute.Offers);
                const filtered = data.filter(offer => offer.id !== offerId).slice(0, 3);
                dispatch(setNearbyOffers(filtered));
            } catch (err) {
                dispatch(setNearbyOffers([]));
            }
        }
    }
);

const postReviewAction = createAsyncThunk<
    void,
    { offerId: string; comment: string; rating: number },
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'offer/postReview',
    async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
        try {
            await api.post(`${APIRoute.Comments}/${offerId}`, { 
                comment, 
                rating 
            });
            await dispatch(fetchReviewsAction(offerId));
        } catch (error) {
            dispatch(setError('Failed to post review'));
        }
    }
);

const toggleFavoriteAction = createAsyncThunk<
    void,
    { offerId: string; status: boolean },
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'offer/toggleFavorite',
    async ({ offerId, status }, { dispatch, extra: api }) => {
        try {
            // Отправляем запрос на сервер
            await api.post(`/offers/${offerId}/favorite`, { status });
            
            // Обновляем список предложений
            await dispatch(fetchOffersAction());
            
            // Принудительно обновляем компонент через небольшой таймаут
            setTimeout(() => {
                window.dispatchEvent(new Event('favorite-updated'));
            }, 100);
            
        } catch (error) {
            dispatch(setError('Failed to toggle favorite'));
        }
    }
);

export {
    fetchOfferAction,
    fetchReviewsAction,
    fetchNearbyOffersAction,
    postReviewAction,
    toggleFavoriteAction
};