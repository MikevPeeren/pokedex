// GraphQL
import gql from 'graphql-tag';

/**
 * Search through the GraphQL database and find Pokemons by the Amount given.
 *
 * @param {number} amount
 * @returns {data: string; loading: string; error: string;}
 */
export const getPokemonGQLByAmount = (amount: number) => {
  return gql`
    {
      pokemons(first: ${amount}) {
        id
        number
        name
        image
        types
        evolutions {
          id
          number
          name
          image
        }
      }
    }
  `;
};

/**
 * Search through the GraphQL database and find a Pokemon by its Name.
 *
 * @param {string} name
 * @returns {data: string; loading: string; error: string;}
 */
export const getPokemonGQLByName = (name: string) => {
  return gql`
    {
      pokemon(name: "${name}") {
        id
        number
        name
        image
        types
        evolutions {
          id
          number
          name
          image
        }
      }
    }
  `;
};
