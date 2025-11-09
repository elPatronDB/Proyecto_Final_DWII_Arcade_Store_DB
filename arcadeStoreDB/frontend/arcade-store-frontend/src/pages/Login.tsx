import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12">
      <div className="card bg-base-200 border border-base-300 w-full max-w-md shadow-2xl">
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-bold text-primary-content justify-center mb-6">
            Iniciar Sesión
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary-content">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="input input-bordered bg-base-100 border-base-300 text-primary-content"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary-content">Contraseña</span>
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered bg-base-100 border-base-300 text-primary-content"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-accent ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Entrar'}
              </button>
            </div>
          </form>
          
          <div className="divider text-primary-content">o</div>
          
          <p className="text-center text-primary-content">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="link link-accent">
              Regístrate aquí
            </Link>
          </p>

          {/* Credenciales de prueba */}
          <div className="mt-6 p-4 bg-base-300 rounded-lg">
            <p className="text-sm text-primary-content text-center">
              <strong>Admin:</strong> admin@arcadestore.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;