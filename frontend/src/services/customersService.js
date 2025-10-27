import { customersAPI } from './api';

export const customersService = {
    getAllCustomers: () => customersAPI.get('/customers'),
    getCustomer: (id) => customersAPI.get(`/customers/${id}`),
    createCustomer: (data) => customersAPI.post('/customers', data),
    updateCustomer: (id, data) => customersAPI.put(`/customers/${id}`, data),
    deleteCustomer: (id) => customersAPI.delete(`/customers/${id}`),

    getAllReservations: () => customersAPI.get('/reservations'),
    getReservation: (id) => customersAPI.get(`/reservations/${id}`),
    createReservation: (data) => customersAPI.post('/reservations', data),
    updateReservation: (id, data) => customersAPI.put(`/reservations/${id}`, data),
    deleteReservation: (id) => customersAPI.delete(`/reservations/${id}`),
};