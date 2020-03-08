// React
import React from 'react';

// CSS
import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: {
    number: string;
    name: string;
    image: string;
    types: [];
  };
  index: string;
}

const PokemonCard: React.FC<PokemonCardProps> = props => {
  const { index, pokemon } = props;

  console.log(pokemon);

  return (
    <div key={index} className="PokemonCard">
      <img
        className="PokemonCard__image"
        alt={`${pokemon.name}`}
        src={pokemon.image}
      />
      <div className="PokemonCard__body">
        <div className="PokemonCard__body--content">
          <span className="PokemonCard__body--pokemonName">
            {pokemon.number} - {pokemon.name}
          </span>
          <span className="PokemonCard__body--pokemonType">
            {pokemon.types.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
