require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('faker');
const MenuItem = require('../models/Menu');

// Configurar faker en español
faker.locale = 'es';

const categorias = ['Entradas', 'Platos Principales', 'Postres', 'Bebidas', 'Pizzas', 'Pastas', 'Ensaladas'];

const nombresComida = {
  'Entradas': ['Bruschetta Clásica', 'Tabla de Quesos', 'Empanadas Criollas', 'Ceviche de Pescado'],
  'Platos Principales': ['Lomo Saltado', 'Pollo a la Brasa', 'Salmón Grillado', 'Arroz con Pollo'],
  'Postres': ['Tiramisú', 'Cheesecake de Fresa', 'Brownie con Helado', 'Flan de Vainilla'],
  'Bebidas': ['Limonada Natural', 'Chicha Morada', 'Jugo de Naranja', 'Coca Cola'],
  'Pizzas': ['Pizza Margherita', 'Pizza Pepperoni', 'Pizza Hawaiana', 'Pizza Cuatro Quesos'],
  'Pastas': ['Spaghetti Boloñesa', 'Fettuccine Alfredo', 'Penne Arrabbiata', 'Lasagna Clásica'],
  'Ensaladas': ['Ensalada César', 'Ensalada Griega', 'Ensalada Caprese', 'Ensalada Mixta']
};

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado para seeding');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

const generarMenuItems = async () => {
  try {
    console.log('Eliminando datos existentes...');
    await MenuItem.deleteMany({});

    console.log('Generando 25,000 elementos del menú...');
    const menuItems = [];

    for (let i = 0; i < 25000; i++) {
      const categoria = faker.random.arrayElement(categorias);
      const nombres = nombresComida[categoria];
      const nombreBase = faker.random.arrayElement(nombres);
      
      const menuItem = {
        nombre: `${nombreBase} ${faker.random.number({ min: 1, max: 100 })}`,
        descripcion: faker.lorem.sentence(),
        precio: faker.random.number({ min: 5, max: 80, precision: 0.1 }),
        categoria: categoria,
        ingredientes: faker.random.words(faker.random.number({ min: 2, max: 6 })).split(' '),
        disponible: faker.random.boolean(),
        tiempo_preparacion: faker.random.number({ min: 5, max: 45 }),
        imagen_url: `${categoria.toLowerCase()}-${i}.jpg`,
        vegetariano: faker.random.boolean(),
        vegano: faker.random.boolean()
      };

      menuItems.push(menuItem);
    }

    await MenuItem.insertMany(menuItems);
    console.log('25,000 elementos del menú creados exitosamente');
    
    process.exit(0);
  } catch (error) {
    console.error('Error generando datos:', error);
    process.exit(1);
  }
};

conectarDB().then(generarMenuItems);