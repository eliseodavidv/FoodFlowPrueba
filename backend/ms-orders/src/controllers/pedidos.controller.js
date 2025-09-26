import Pedido from '../models/pedido.model.js';
import fetch from 'node-fetch';

export async function getPedidos(req, res) {
  const pedidos = await Pedido.find();
  res.json(pedidos);
}

export async function createPedido(req, res) {
  const { cliente_id, platos } = req.body;

  try {
    const clienteRes = await fetch(`${process.env.CLIENTES_URL}/customers/${cliente_id}`);
    if (!clienteRes.ok) return res.status(400).json({ error: 'Cliente no válido' });

    for (const p of platos) {
      const platoRes = await fetch(`${process.env.MENU_URL}/platos/${p.plato_id}`);
      if (!platoRes.ok) return res.status(400).json({ error: `Plato ${p.plato_id} no válido` });
    }

    const pedido = new Pedido({ cliente_id, platos });
    await pedido.save();

    res.status(201).json({ pedido_id: pedido._id });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear pedido', detalle: err.message });
  }
}

export async function getPedidoEnriquecido(req, res) {
  const id = req.params.id;

  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

    const clienteRes = await fetch(`${process.env.CLIENTES_URL}/customers/${pedido.cliente_id}`);
    const cliente = await clienteRes.json();

    const platos = [];
    for (const p of pedido.platos) {
      const platoRes = await fetch(`${process.env.MENU_URL}/platos/${p.plato_id}`);
      const info = await platoRes.json();
      platos.push({ ...info, cantidad: p.cantidad });
    }

    res.json({ id, fecha: pedido.fecha, cliente, platos });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedido enriquecido', detalle: err.message });
  }
}
