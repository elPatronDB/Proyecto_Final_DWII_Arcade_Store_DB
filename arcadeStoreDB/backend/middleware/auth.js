// Middleware para verificar si el usuario está autenticado

import { User } from "../models/Users.js";
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

// Middleware admin - debe usarse después de auth
export const adminAuth = async (req, res, next) => {
    try {
        // Verificar que el usuario esté autenticado (debe venir de auth middleware)
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Verificar rol de admin
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'No tienes permisos de administrador' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Error verificando permisos de administrador' });
    }
};
