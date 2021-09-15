import React from 'react';
import Header from '../components/Header';
import Lista from '../components/Lista';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const NUMBER_TWO = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickFunction = this.onClickFunction.bind(this);

    this.state = {
      nameInput: '',
      stateButton: false,
      isLoading: false,
      artistsAlbum: [],
      nameSearch: '',
    };
  }

  onChangeInput(event) {
    this.setState({
      nameInput: event.target.value,
      stateButton: event.target.value.length >= NUMBER_TWO,
    });
  }

  async onClickFunction() {
    this.setState(
      { isLoading: true },
      async () => {
        const { nameInput } = this.state;
        const nameString = nameInput;
        const returnFetch = await searchAlbumsAPI(nameString);
        this.setState(
          { isLoading: false,
            nameSearch: nameString,
            nameInput: '',
            artistsAlbum: returnFetch },
        );
      },
    );
  }

  renderContent() {
    const { nameInput, stateButton, nameSearch } = this.state;
    return (
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
        <h3>
          { nameSearch.length === 0 ? '' : `Resultado de álbuns de: ${nameSearch}` }
        </h3>
      </div>
    );
  }

  render() {
    const { isLoading, artistsAlbum } = this.state;
    return (
      <>
        <Header />
        <div>{ isLoading ? <Loading /> : this.renderContent() }</div>
        <div>
          { artistsAlbum.length !== 0
            ? <Lista albunsArray={ artistsAlbum } />
            : 'Nenhum álbum foi encontrado' }
        </div>
      </>
    );
  }
}

export default Search;
