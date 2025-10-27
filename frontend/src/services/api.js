import axios from 'axios';

const API_URLS = {
    customers: 'http://52.73.193.181:8001',
    orders: 'http://52.73.193.181:8002',
    menu: 'http://52.73.193.181:8003/api/v1',
    history: 'http://52.73.193.181:8004',
    analytics: 'http://52.73.193.181:8010'
};
export const customersAPI = axios.create({
    baseURL: API_URLS.customers,
    headers: { 'Content-Type': 'application/json' },
});

export const ordersAPI = axios.create({
    baseURL: API_URLS.orders,
    headers: { 'Content-Type': 'application/json' },
});

export const menuAPI = axios.create({
    baseURL: API_URLS.menu,
    headers: { 'Content-Type': 'application/json' },
});

export const historyAPI = axios.create({
    baseURL: API_URLS.history,
    headers: { 'Content-Type': 'application/json' },
});

export const analyticsAPI = axios.create({
    baseURL: API_URLS.analytics,
    headers: { 'Content-Type': 'application/json' },
});

const handleError = (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
};

customersAPI.interceptors.response.use(response => response, handleError);
ordersAPI.interceptors.response.use(response => response, handleError);
menuAPI.interceptors.response.use(response => response, handleError);
historyAPI.interceptors.response.use(response => response, handleError);
analyticsAPI.interceptors.response.use(response => response, handleError);