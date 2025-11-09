import { create } from 'zustand';
import api from '../config/api';

export interface Game {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'acción' | 'aventura' | 'puzzle' | 'arcade' | 'estrategia';
  imagen: string;
  tipo: 'gratuito' | 'pago';
  activo: boolean;
  fechaCreacion?: string;
}

interface GameState {
  games: Game[];
  isLoading: boolean;
  error: string | null;
  fetchGames: () => Promise<void>;
  addToCart: (gameId: string) => Promise<{ success: boolean; message: string }>;
}

export const useGameStore = create<GameState>((set, get) => ({
  games: [],
  isLoading: false,
  error: null,

  fetchGames: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/games');
      const { success, data } = response.data;

      if (success) {
        set({ games: data, isLoading: false });
      } else {
        set({ error: 'Error al cargar juegos', isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Error al cargar juegos',
        isLoading: false,
      });
    }
  },

  addToCart: async (gameId: string) => {
    try {
      const response = await api.post('/cart/add', { juegoId: gameId });
      const { success, message } = response.data;

      if (success) {
        return { success: true, message: message || 'Juego agregado al carrito' };
      } else {
        return { success: false, message: message || 'Error al agregar al carrito' };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al agregar al carrito';
      return { success: false, message };
    }
  },
}));

