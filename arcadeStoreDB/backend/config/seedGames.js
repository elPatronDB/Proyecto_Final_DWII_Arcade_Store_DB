
import Game from '../models/Game.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seedGames = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const games = [
      {
        nombre: 'Balloon Pop',
        descripcion: 'Revienta la mayor cantidad de globos en 30 segundos',
        precio: 0,
        categoria: 'arcade',
        imagen: '/images/balloon-pop.jpg',
        tipo: 'gratuito'
      },
      {
        nombre: 'Puzzle Master',
        descripcion: 'Armar el rompecabezas con la menor cantidad de movimientos',
        precio: 80,
        categoria: 'puzzle',
        imagen: '/images/puzzle.jpg',
        tipo: 'pago'
      },
      {
        nombre: 'Space Adventure',
        descripcion: 'Aventura espacial con naves y aliens',
        precio: 50,
        categoria: 'acción',
        imagen: '/images/space-adventure.jpg',
        tipo: 'pago'
      }
    ];

    await Game.deleteMany({});
    await Game.insertMany(games);
    
    console.log('Juegos de prueba creados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error creando juegos de prueba:', error);
    process.exit(1);
  }
};

seedGames();