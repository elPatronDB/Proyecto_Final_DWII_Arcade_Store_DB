import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/games.js';
import createAdminUser from './config/createAdmin.js';
import cartRoutes from './routes/cart.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/cart', cartRoutes);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('MongoDB conectado:', conn.connection.host);
    console.log('Base de datos:', conn.connection.name);
    
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  await createAdminUser();
  
  app.get('/api/test', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado';
    
    res.json({ 
      message: 'API ArcadeStore funcionando',
      database: `MongoDB ${dbStatus}`,
      timestamp: new Date().toISOString()
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();