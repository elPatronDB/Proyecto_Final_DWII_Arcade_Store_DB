import Game from '../models/Game.js';

export const getGames = async (req, res) => {
  try {
    const games = await Game.find({ activo: true });
    
    res.status(200).json({
      success: true,
      count: games.length,
      data: games
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo juegos',
      error: error.message
    });
  }
};

export const getGameById = async (req, res) => {
  try {
    // Validar formato de ID de MongoDB
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'ID de juego inválido'
      });
    }
    
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Juego no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo juego',
      error: error.message
    });
  }
};

export const createGame = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, imagen, tipo } = req.body;
    
    // Validación de campos requeridos
    if (!nombre || !descripcion || precio === undefined || !categoria || !imagen || !tipo) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }
    
    // Validación de tipo
    if (!['gratuito', 'pago'].includes(tipo)) {
      return res.status(400).json({
        success: false,
        message: 'El tipo debe ser "gratuito" o "pago"'
      });
    }
    
    // Validación de precio para juegos de pago
    if (tipo === 'pago' && precio <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Los juegos de pago deben tener un precio mayor a 0'
      });
    }
    
    // Validación de precio para juegos gratuitos
    if (tipo === 'gratuito' && precio !== 0) {
      return res.status(400).json({
        success: false,
        message: 'Los juegos gratuitos deben tener precio 0'
      });
    }
    
    const newGame = new Game({
      nombre,
      descripcion,
      precio,
      categoria,
      imagen,
      tipo
    });
    
    await newGame.save();
    
    res.status(201).json({
      success: true,
      message: 'Juego creado exitosamente',
      data: newGame
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creando juego',
      error: error.message
    });
  }
};

export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ID de MongoDB
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'ID de juego inválido'
      });
    }
    
    const { nombre, descripcion, precio, categoria, imagen, tipo, activo } = req.body;
    
    const game = await Game.findById(id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Juego no encontrado'
      });
    }
    
    // Validación de tipo si se proporciona
    if (tipo && !['gratuito', 'pago'].includes(tipo)) {
      return res.status(400).json({
        success: false,
        message: 'El tipo debe ser "gratuito" o "pago"'
      });
    }
    
    // Validación de precio y tipo
    const finalTipo = tipo || game.tipo;
    const finalPrecio = precio !== undefined ? precio : game.precio;
    
    if (finalTipo === 'pago' && finalPrecio <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Los juegos de pago deben tener un precio mayor a 0'
      });
    }
    
    if (finalTipo === 'gratuito' && finalPrecio !== 0) {
      return res.status(400).json({
        success: false,
        message: 'Los juegos gratuitos deben tener precio 0'
      });
    }
    
    // Actualizar campos
    if (nombre) game.nombre = nombre;
    if (descripcion) game.descripcion = descripcion;
    if (precio !== undefined) game.precio = precio;
    if (categoria) game.categoria = categoria;
    if (imagen) game.imagen = imagen;
    if (tipo) game.tipo = tipo;
    if (activo !== undefined) game.activo = activo;
    
    await game.save();
    
    res.status(200).json({
      success: true,
      message: 'Juego actualizado exitosamente',
      data: game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error actualizando juego',
      error: error.message
    });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ID de MongoDB
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'ID de juego inválido'
      });
    }
    
    const game = await Game.findById(id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Juego no encontrado'
      });
    }
    
    // Soft delete: marcar como inactivo en lugar de eliminar
    game.activo = false;
    await game.save();
    
    res.status(200).json({
      success: true,
      message: 'Juego eliminado exitosamente (marcado como inactivo)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error eliminando juego',
      error: error.message
    });
  }
};
