// React
import React from 'react';

// Testing
import { render, screen } from '@testing-library/react';

// Component
import App from './App';

// Apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

it('renders without crashing', () => {
  const cache = new InMemoryCache();
  const link = new HttpLink({
    uri: 'https://graphql-pokemon.now.sh/',
  });

  const client = new ApolloClient({
    cache,
    link,
  });

  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  );

  expect(
    screen.getByText('Search for your favorite Pokemon.'),
  ).toBeInTheDocument();

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
