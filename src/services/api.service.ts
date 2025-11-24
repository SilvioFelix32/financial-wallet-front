import axios, { AxiosInstance } from 'axios';
import { environment } from '@/config/environment';
import { getCookie, removeCookie } from '@/utils/cookies';

const API_URL = environment.api.baseURL;

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('cognito_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeCookie('cognito_access_token');
      removeCookie('cognito_id_token');
      window.location.href = '/auth/signIn';
    }
    return Promise.reject(error);
  }
);

export default api;

