import Cart from '../models/Cart.js'
import Game from '../models/Game.js'

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ usuarioId: req.user._id })
      .populate('juegos.juegoId');
    
    res.status(200).json({
      success: true,
      data: cart || { juegos: [], total: 0 }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo carrito'
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { juegoId } = req.body;
    const game = await Game.findById(juegoId);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Juego no encontrado'
      });
    }

    let cart = await Cart.findOne({ usuarioId: req.user._id });
    
    if (!cart) {
      cart = new Cart({ usuarioId: req.user._id, juegos: [] });
    }

    const existingItem = cart.juegos.find(item => 
      item.juegoId.toString() === juegoId
    );

    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      cart.juegos.push({ juegoId, cantidad: 1 });
    }

    cart.total = cart.juegos.reduce((total, item) => {
      return total + (game.precio * item.cantidad);
    }, 0);

    await cart.save();
    await cart.populate('juegos.juegoId');

    res.status(200).json({
      success: true,
      message: 'Juego agregado al carrito',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error agregando al carrito'
    });
  }
};