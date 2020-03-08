// React
import React from 'react';

// CSS
import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: {
    name: string;
    image: string;
  };
  index: string;
}

const PokemonCard: React.FC<PokemonCardProps> = props => {
  const { index, pokemon } = props;

  return (
    <div key={index} className="PokemonCard">
      <img
        className="PokemonCard__image"
        alt={`${pokemon.name}`}
        src={pokemon.image}
      />
      <div className="PokemonCard__body">
        <h3 className="PokemonCard__body--h3">{pokemon.name}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;
