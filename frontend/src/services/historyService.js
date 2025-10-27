import { historyAPI } from './api';

export const historyService = {
    getCustomerHistory: (customerId) => historyAPI.get(`/history/${customerId}`),
};