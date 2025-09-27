const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  getMenuItemsByCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategories
} = require('../controllers/menuController');

// Obtener todos los elementos del menú
router.get('/', getAllMenuItems);

// Obtener todas las categorías disponibles
router.get('/categories', getCategories);

// Obtener elementos por categoría
router.get('/categoria/:categoria', getMenuItemsByCategory);

// Obtener un elemento del menú por ID
router.get('/:id', getMenuItemById);

// Crear un nuevo elemento del menú
router.post('/', createMenuItem);

// Actualizar un elemento del menú
router.put('/:id', updateMenuItem);

// Eliminar un elemento del menú
router.delete('/:id', deleteMenuItem);

module.exports = router;