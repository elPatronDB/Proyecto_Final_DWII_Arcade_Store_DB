import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar bg-base-200 border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            🎮 Arcade Store
          </Link>
        </div>
        <div className="flex-none gap-2">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    {user.nombre.charAt(0).toUpperCase()}
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <span className="text-sm font-semibold">{user.nombre}</span>
                  </li>
                  <li>
                    <span className="text-xs text-base-content/70">{user.email}</span>
                  </li>
                  {user.rol === 'admin' && (
                    <li>
                      <span className="badge badge-accent">Admin</span>
                    </li>
                  )}
                  <li className="divider"></li>
                  <li>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-accent">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

