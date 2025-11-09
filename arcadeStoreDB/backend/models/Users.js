// importaciones

import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    rol: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    juegosComprados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juego'
    }],
    carrito: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juego'
    }]
});

//middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(actualPassword) {
    return await bcrypt.compare(actualPassword, this.password);
};

export const User = mongoose.model('User', userSchema);