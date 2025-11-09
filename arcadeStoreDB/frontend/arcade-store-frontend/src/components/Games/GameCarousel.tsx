import React, { useRef, useState } from 'react';
import type { Game } from '../../store/gameStore';
import GameCard from './GameCard';

interface GameCarouselProps {
  games: Game[];
  onAddToCart: (game: Game) => void;
}

const GameCarousel: React.FC<GameCarouselProps> = ({ games, onAddToCart }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      setTimeout(checkScroll, 300);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [games]);

  if (games.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-primary-content">No hay juegos disponibles</p>
      </div>
    );
  }

  return (
    <div className="relative px-12">
      {/* Botón izquierdo */}
      {canScrollLeft && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <button 
            onClick={() => scroll('left')}
            className="btn btn-circle btn-ghost bg-base-100 bg-opacity-90 hover:bg-opacity-100 border border-base-300"
          >
            ‹
          </button>
        </div>
      )}
      
      {/* Botón derecho */}
      {canScrollRight && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <button 
            onClick={() => scroll('right')}
            className="btn btn-circle btn-ghost bg-base-100 bg-opacity-90 hover:bg-opacity-100 border border-base-300"
          >
            ›
          </button>
        </div>
      )}

      {/* Carrusel */}
      <div 
        ref={carouselRef}
        className="carousel-container flex gap-6 overflow-x-auto py-4 scroll-smooth"
        onScroll={checkScroll}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollPadding: '0 24px'
        }}
      >
        {games.map((game) => (
          <div key={game._id} className="flex-shrink-0 w-80 first:pl-0 last:pr-0">
            <GameCard game={game} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {games.slice(0, 5).map((_, index) => (
          <div 
            key={index}
            className="w-2 h-2 rounded-full bg-base-300"
          />
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;