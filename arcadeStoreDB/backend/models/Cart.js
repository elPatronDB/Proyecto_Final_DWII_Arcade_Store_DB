import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  juegos: [{
    juegoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    cantidad: {
      type: Number,
      default: 1
    }
  }],
  total: {
    type: Number,
    default: 0
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Cart', cartSchema);