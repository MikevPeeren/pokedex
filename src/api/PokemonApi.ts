// GraphQL
import gql from 'graphql-tag';

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
