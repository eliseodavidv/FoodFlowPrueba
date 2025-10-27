import { ordersAPI } from './api';

export const ordersService = {
    getAllOrders: () => ordersAPI.get('/pedidos'),
    getOrdersByCustomer: (customerId) => ordersAPI.get(`/pedidos/customers/${customerId}`),
    createOrder: (data) => ordersAPI.post('/pedidos', data),
};
