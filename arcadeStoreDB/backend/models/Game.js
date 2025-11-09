import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  categoria: {
    type: String,
    required: true,
    enum: ['acción', 'aventura', 'puzzle', 'arcade', 'estrategia']
  },
  imagen: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['gratuito', 'pago'],
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Game', gameSchema);