// React
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

// Main App
import App from './App';

// Apollo
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
// import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({
  uri: 'https://graphql-pokemon2.vercel.app/',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
