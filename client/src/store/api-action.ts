import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { OffersList } from '../types/offer.js';
import {offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUser} from './action.js';
import {saveToken, dropToken} from '../services/token.js';
import {APIRoute, AuthorizationStatus} from '../const.js';
import {AuthData, UserData} from '../types/user-data.js';
import { store } from './index.js';

const TIMEOUT_SHOW_ERROR = 2000;

const fetchOffersAction = createAsyncThunk<void, undefined, {
 dispatch: AppDispatch;
 state: State;
 extra: AxiosInstance;
}>(
 'data/fetchOffers',
 async (_arg, {dispatch, extra: api}) => {
  try {
    console.log('Fetching offers...');
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OffersList[]>(APIRoute.Offers);
    console.log('Offers received:', data.length);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(offersCityList(data));
  } catch (error) {
    console.error('Error fetching offers:', error);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setError('Failed to load offers'));
  }
 },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'user/checkAuth',
   async (_arg, {dispatch, extra: api}) => {
     try {
       console.log('Checking auth...');
       const { data } = await api.get<UserData>(APIRoute.Login);
       console.log('Auth check successful:', data.email);
       dispatch(requireAuthorization(AuthorizationStatus.Auth));
       dispatch(setUser(data));
     } catch (error) {
       console.log('Auth check failed - user not authenticated');
       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
       dispatch(setUser(null));
     }
   },
 );

const logoutAction = createAsyncThunk<void, undefined, {
 dispatch: AppDispatch;
 state: State;
 extra: AxiosInstance;
}>(
 'user/logout',
 async (_arg, {dispatch, extra: api}) => {
   try {
     console.log('Logging out...');
     await api.delete(APIRoute.Logout);
     dropToken();
     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
     dispatch(setUser(null));
     console.log('Logout successful');
   } catch (error) {
     console.error('Logout error:', error);
     dropToken();
     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
     dispatch(setUser(null));
   }
 },
);

const clearErrorAction = createAsyncThunk(
   'clearError',
   () => {
     setTimeout(
       () => store.dispatch(setError(null)),
       TIMEOUT_SHOW_ERROR,
     );
   },
 );
 
 const loginAction = createAsyncThunk<
 UserData,       
 AuthData,       
 { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
 'user/login',
 async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
   try {
     console.log('Login attempt:', { email });
     const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
     console.log('Login success, user:', data.email);
     console.log('Token received:', data.token ? 'present' : 'missing');
     
     if (data.token) {
       // Сохраняем токен в localStorage
       saveToken(data.token);
       console.log('Token saved to localStorage');
     } else {
       console.error('No token in response!');
     }
     
     dispatch(requireAuthorization(AuthorizationStatus.Auth));
     dispatch(setUser(data));
     return data;
   } catch (err: any) {
     console.error('Login error:', err.response?.data?.message || err.message);
     dropToken();
     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
     dispatch(setUser(null));
     dispatch(setError(err.response?.data?.message || 'Login failed'));
     return rejectWithValue('Login failed');
   }
 }
);

export {fetchOffersAction, checkAuthAction, loginAction, logoutAction, clearErrorAction}