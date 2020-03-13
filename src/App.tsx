// React
import React, { useState, useEffect } from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';

// Api
import { getPokemonGQLByAmount } from './api/PokemonApi';

// CSS
import './App.scss';

// Components
import PokemonCard from './components/PokemonCard';
import SearchForm from './components/SearchForm';

// Constants
import { LOADING, ERROR } from './constants/general';

function App() {
  const [pokemonSearchCount, setPokemonSearchCount] = useState(20);

  const GET_POKEMON_INFO = getPokemonGQLByAmount(pokemonSearchCount);

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  console.log(loading);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  /**
   * This function will make a new API call when the bottom of the page is reached
   *
   * @param {void}
   *
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
      setPokemonSearchCount(pokemonSearchCount + 20);
    }
  };

  return (
    <div className="PokemonOverview">
      <div className="PokemonOverview__searchform">
        <SearchForm />
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
          data.pokemons.map((pokemon, index) => (
            <PokemonCard
              key={Math.random()}
              index={index}
              pokemon={pokemon}
            ></PokemonCard>
          ))}
      </div>
    </div>
  );
}

export default App;
