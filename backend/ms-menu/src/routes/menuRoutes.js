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

router.get('/', getAllMenuItems);

router.get('/categories', getCategories);

router.get('/categoria/:categoria', getMenuItemsByCategory);

router.get('/:id', getMenuItemById);

router.post('/', createMenuItem);

router.put('/:id', updateMenuItem);

router.delete('/:id', deleteMenuItem);

module.exports = router;