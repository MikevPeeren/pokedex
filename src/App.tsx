// React
import React from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';

// GraphQL
import gql from 'graphql-tag';

// CSS
import './App.scss';

// Components
import PokemonCard from './components/PokemonCard';

// CONSTANTS
import { HEADER_TEXT, LOADING, ERROR } from './constants/general';

function App() {
  const GET_POKEMON_INFO = gql`
    {
      pokemons(first: 10) {
        id
        number
        name
        image
        evolutions {
          id
          number
          name
          image
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  return (
    <div className="PokemonOverview">
      <h1 className="PokemonOverview__header">{HEADER_TEXT}</h1>
      <div className="PokemonOverview__pokemons">
        {loading && <p>{LOADING}</p>}
        {error && <p>{ERROR}</p>}
        {data &&
          data.pokemons &&
          // @ts-ignore
          data.pokemons.map((pokemon, index) => (
            <PokemonCard index={index} pokemon={pokemon}></PokemonCard>
          ))}
      </div>
    </div>
  );
}

export default App;
