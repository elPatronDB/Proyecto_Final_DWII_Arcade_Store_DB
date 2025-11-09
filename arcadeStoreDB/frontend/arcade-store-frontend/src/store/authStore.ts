import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../config/api';

interface User {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'usuario';
  juegosComprados?: string[];
  fechaRegistro?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (nombre: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { success, message, data } = response.data;

          if (success && data) {
            set({
              user: data.user,
              token: data.token,
              isLoading: false,
            });
            return { success: true, message };
          } else {
            set({ isLoading: false });
            return { success: false, message: message || 'Error al iniciar sesión' };
          }
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Error al iniciar sesión';
          return { success: false, message };
        }
      },

      register: async (nombre: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/register', { nombre, email, password });
          const { success, message, data } = response.data;

          if (success && data) {
            set({
              user: data.user,
              token: data.token,
              isLoading: false,
            });
            return { success: true, message };
          } else {
            set({ isLoading: false });
            return { success: false, message: message || 'Error al registrarse' };
          }
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Error al registrarse';
          return { success: false, message };
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      getProfile: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await api.get('/auth/profile');
          const { success, data } = response.data;

          if (success && data?.user) {
            set({ user: data.user });
          }
        } catch (error) {
          console.error('Error obteniendo perfil:', error);
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);

