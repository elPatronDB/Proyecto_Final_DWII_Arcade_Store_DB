
import { User } from '../models/Users.js';
import Game from '../models/Game.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Creando usuario administrador...');
    const adminExists = await User.findOne({ email: 'admin@arcadestore.com' });
    if (!adminExists) {
      const admin = new User({
        nombre: 'Administrador',
        email: 'admin@arcadestore.com',
        password: 'admin123',
        rol: 'admin'
      });
      await admin.save();
      console.log('✅ Admin creado: admin@arcadestore.com / admin123');
    }

    console.log('Creando juegos...');
    const games = [
      {
        nombre: 'Balloon Pop',
        descripcion: 'Revienta la mayor cantidad de globos en 30 segundos',
        precio: 0,
        categoria: 'arcade',
        imagen: '/images/balloon.jpg',
        tipo: 'gratuito'
      },
      {
        nombre: 'Puzzle Master',
        descripcion: 'Armar el rompecabezas con la menor cantidad de movimientos',
        precio: 80,
        categoria: 'puzzle',
        imagen: '/images/puzzle.jpg',
        tipo: 'pago'
      }
    ];

    await Game.deleteMany({});
    await Game.insertMany(games);
    console.log('✅ Juegos creados');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedData();