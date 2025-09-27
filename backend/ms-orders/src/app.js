import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import pedidosRoutes from './routes/pedidos.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/pedidos', pedidosRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Microservicio de Pedidos corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));
