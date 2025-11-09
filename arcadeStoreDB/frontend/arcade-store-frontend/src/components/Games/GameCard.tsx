import React from 'react';
import { Game } from '../../store/gameStore';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';

interface GameCardProps {
  game: Game;
  onAddToCart: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onAddToCart }) => {
  const { user } = useAuthStore();
  const { addToCart } = useGameStore();

  const handleAddToCart = async () => {
    if (!user) {
      alert('Debes iniciar sesión para agregar juegos al carrito');
      return;
    }

    const result = await addToCart(game._id);
    if (result.success) {
      onAddToCart(game);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="card bg-base-200 border border-base-300 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="h-48 overflow-hidden">
        <img 
          src={game.imagen} 
          alt={game.nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg text-primary-content">{game.nombre}</h2>
        <p className="text-sm text-base-content/70 line-clamp-2">{game.descripcion}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="badge badge-outline">{game.categoria}</div>
          <div className="flex items-center gap-2">
            {game.tipo === 'gratuito' ? (
              <span className="text-accent font-bold">Gratis</span>
            ) : (
              <span className="text-primary font-bold">${game.precio}</span>
            )}
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            onClick={handleAddToCart}
            className="btn btn-accent btn-sm w-full"
            disabled={!user}
          >
            {user ? 'Agregar al Carrito' : 'Inicia Sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;

