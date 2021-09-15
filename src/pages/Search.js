import React from 'react';
import Header from '../components/Header';

const NUMBER_TWO = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.state = {
      nameInput: '',
      stateButton: false,
    };
  }

  onChangeInput(event) {
    this.setState({
      nameInput: event.target.value,
      stateButton: event.target.value.length >= NUMBER_TWO,
    });
  }

  render() {
    const { nameInput, stateButton } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.onChangeInput }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            value={ nameInput }
            disabled={ !stateButton }
            onClick={ this.onClickFunction }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
