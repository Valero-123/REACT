import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { processErrorHandle } from './process-error-handle';
import { getToken } from './token';
import {StatusCodes} from 'http-status-codes';

type DetailMessageType = {
    type: string;
    message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true,
}

export const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });
    
    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = getToken();

            if (token) {
                config.headers = config.headers || {};
                // Сервер ожидает Bearer токен в заголовке Authorization
                config.headers['Authorization'] = `Bearer ${token}`;
                console.log('Adding Bearer token to request');
            } else {
                console.log('No token found for request');
            }
            
            console.log('Request:', config.method?.toUpperCase(), config.url);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    api.interceptors.response.use(
        (response) => {
            console.log('Response:', response.status, response.config.url);
            return response;
        },
        (error: AxiosError<DetailMessageType>) => {
            console.error('Response error:', error.response?.status, error.config?.url, error.response?.data);
            if (error.response && shouldDisplayError(error.response)) {
                const detailMessage = error.response.data;
                processErrorHandle(detailMessage?.message || 'Unknown error');
            }
            throw error;
        }
    );
    
    return api;
};