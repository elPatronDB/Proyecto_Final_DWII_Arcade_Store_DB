import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Game } from '../store/gameStore';
import GameCarousel from '../components/Games/GameCarousel';

const Home: React.FC = () => {
  const { games, isLoading, fetchGames, addToCart } = useGameStore();

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleAddToCart = async (game: Game) => {
    const result = await addToCart(game._id);
    if (result.success) {
      // El mensaje ya se muestra en GameCard
      console.log('Juego agregado:', game.nombre);
    }
  };

  // Agrupar juegos por categoría
  const gamesByCategory = games.reduce((acc, game) => {
    if (!acc[game.categoria]) {
      acc[game.categoria] = [];
    }
    acc[game.categoria].push(game);
    return acc;
  }, {} as Record<string, Game[]>);

  const categories = Object.keys(gamesByCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-content mb-4">
            🎮 Bienvenido a Arcade Store
          </h1>
          <p className="text-xl text-base-content/70">
            Descubre los mejores juegos arcade
          </p>
        </div>

        {games.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-primary-content text-lg">
              No hay juegos disponibles en este momento
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-3xl font-bold text-primary-content mb-6 capitalize">
                  {category}
                </h2>
                <GameCarousel
                  games={gamesByCategory[category]}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

