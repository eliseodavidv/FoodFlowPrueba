import mongoose from 'mongoose';

const PlatoSchema = new mongoose.Schema({
  plato_id: String,
  cantidad: Number
});

const PedidoSchema = new mongoose.Schema({
  cliente_id: String,
  fecha: { type: Date, default: Date.now },
  platos: [PlatoSchema]
});

export default mongoose.model('Pedido', PedidoSchema);
