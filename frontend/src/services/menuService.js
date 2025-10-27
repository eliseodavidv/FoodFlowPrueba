import { menuAPI } from './api';

export const menuService = {
    getAllMenuItems: (params) => menuAPI.get('/menu', { params }),
    getMenuItem: (id) => menuAPI.get(`/menu/${id}`),
    getCategories: () => menuAPI.get('/menu/categories'),
    getMenuByCategory: (categoria) => menuAPI.get(`/menu/categoria/${categoria}`),
    createMenuItem: (data) => menuAPI.post('/menu', data),
    updateMenuItem: (id, data) => menuAPI.put(`/menu/${id}`, data),
    deleteMenuItem: (id) => menuAPI.delete(`/menu/${id}`),
};