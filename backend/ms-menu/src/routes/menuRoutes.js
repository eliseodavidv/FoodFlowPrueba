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

/**
 * @swagger
 * /api/v1/menu:
 *   get:
 *     summary: Lista todos los ítems del menú
 *     tags: [Menú]
 *     responses:
 *       200:
 *         description: Lista de ítems del menú
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 */
router.get('/', getAllMenuItems);

/**
 * @swagger
 * /api/v1/menu/categories:
 *   get:
 *     summary: Lista todas las categorías disponibles
 *     tags: [Menú]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/categories', getCategories);

/**
 * @swagger
 * /api/v1/menu/categoria/{categoria}:
 *   get:
 *     summary: Lista ítems del menú por categoría
 *     tags: [Menú]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de ítems por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/categoria/:categoria', getMenuItemsByCategory);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene un ítem del menú por ID
 *     tags: [Menú]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ítem del menú
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Ítem no encontrado
 */
router.get('/:id', getMenuItemById);

/**
 * @swagger
 * /api/v1/menu:
 *   post:
 *     summary: Crea un nuevo ítem de menú
 *     tags: [Menú]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Ítem creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', createMenuItem);

/**
 * @swagger
 * /api/v1/menu/{id}:
 *   put:
 *     summary: Actualiza un ítem del menú por ID
 *     tags: [Menú]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: Ítem actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Ítem no encontrado
 *       400:
 *         description: Datos inválidos
 */

router.put('/:id', updateMenuItem);

router.delete('/:id', deleteMenuItem);

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nombre:
 *           type: string
 *         categoria:
 *           type: string
 *         precio:
 *           type: number
 */
router.get('/menu', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

module.exports = router;