// React
import React, { useState, useEffect } from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';

// Api
import { getPokemonGQLByAmount, getPokemonGQLByName } from './api/PokemonApi';

// CSS
import './App.scss';

// Components
import PokemonCard from './components/PokemonCard';
import SearchForm from './components/SearchForm';

// Constants
import { LOADING, ERROR } from './constants/general';

const App: React.FC = () => {
  const [pokemonSearchCount, setPokemonSearchCount] = useState(10);
  const [pokemonName, setPokemonName] = useState('');

  let GET_POKEMON_INFO;

  if (pokemonName.length !== 0)
    GET_POKEMON_INFO = getPokemonGQLByName(pokemonName);
  else GET_POKEMON_INFO = getPokemonGQLByAmount(pokemonSearchCount);

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  useEffect(() => {
    /**
     * This function will make a new API call when the bottom of the page is reached
     *
     * @param {void}
     * @returns {void}
     */
    const handleScroll = () => {
      const windowHeight =
        'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;

      const body = document.body;
      const html = document.documentElement;

      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight) {
        setPokemonSearchCount(pokemonSearchCount + 10);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pokemonSearchCount]);

  /**
   * Search for a specific Pokemon bu it's Name.
   *
   * @param pokemonInput
   * @returns {void}
   */
  const searchPokemonByName = (pokemonInput: {
    current: {
      value: string;
    };
  }) => {
    if (pokemonInput.current && pokemonInput.current.value) {
      setPokemonName(pokemonInput.current.value);
    }
  };

  return (
    <div className="PokemonOverview">
      <div className="PokemonOverview__searchform">
        <SearchForm searchPokemonByName={searchPokemonByName} />
      </div>

      {(loading || error) && (
        <div className="PokemonOverview__apiStatus">
          {loading && <p>{LOADING}</p>}
          {error && <p>{ERROR}</p>}
        </div>
      )}

      <div className="PokemonOverview__pokemons">
        {data &&
          data.pokemons &&
          // @ts-ignore
          data.pokemons.map((pokemon: any, index: string) => (
            <PokemonCard
              key={Math.random()}
              index={index}
              pokemon={pokemon}
            ></PokemonCard>
          ))}

        {data && data.pokemon && (
          <PokemonCard
            key={Math.random()}
            index={'0'}
            pokemon={data.pokemon}
          ></PokemonCard>
        )}
      </div>
    </div>
  );
};

export default App;
