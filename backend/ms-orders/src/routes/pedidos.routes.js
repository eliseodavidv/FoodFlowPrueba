import express from 'express';
import * as controller from '../controllers/pedidos.controller.js';

const router = express.Router();

router.get('/test', (req, res) => {
  console.log("Ruta /test ejecutada");
  res.send("Ruta de prueba funcionando");
});

router.get('/', controller.getPedidos);
router.post('/', controller.createPedido);
router.get('/:id', controller.getPedidoEnriquecido);

export default router;
