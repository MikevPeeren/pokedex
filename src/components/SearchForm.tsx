// React
import React, { useRef } from 'react';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// CSS
import './SearchForm.scss';

// Constants
import { SEARCH_LABEL, ENTER_POKEMON, SEARCH } from '../constants/searchform';

interface SearchFormProps {
  searchPokemonByName: Function;
}

const SearchForm: React.FC<SearchFormProps> = props => {
  const { searchPokemonByName } = props;

  const pokemonInput = useRef(null);

  const ifEnterPressed = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchPokemonByName(pokemonInput);
    }
  };

  return (
    <div className="SearchForm">
      <Form
        onSubmit={(event: any) => {
          ifEnterPressed(event);
        }}
      >
        <Form.Group controlId="searchPokemonForm">
          <Form.Label>{SEARCH_LABEL}</Form.Label>
          <Form.Control
            ref={pokemonInput}
            type="text"
            placeholder={ENTER_POKEMON}
            onKeyDown={(event: any) => {
              ifEnterPressed(event);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => {
            searchPokemonByName(pokemonInput);
          }}
        >
          {SEARCH}
        </Button>
      </Form>
    </div>
  );
};

export default SearchForm;
