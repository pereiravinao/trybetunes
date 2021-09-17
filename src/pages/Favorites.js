import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.showFavorites = this.showFavorites.bind(this);

    this.state = {
      isLoading: false,
      isChecked: true,
      musicsFavorites: [],
    };
  }

  componentDidMount() {
    this.showFavorites();
  }

  handleChange(func) {
    func();
  }

  async showFavorites() {
    this.setState(
      { isLoading: true },
      async () => {
        const musicsFavorites = await getFavoriteSongs();
        this.setState({ isLoading: false, musicsFavorites });
      },
    );
  }

  renderPage() {
    const { musicsFavorites, isChecked } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          { musicsFavorites.map(({ previewUrl, trackName, trackId }, idx) => (
            <MusicCard
              key={ idx }
              previewUrl={ previewUrl }
              trackName={ trackName }
              trackId={ trackId }
              text="Favorita"
              isChecked={ isChecked }
              musicsArray={ musicsFavorites }
              onChange={ () => this.handleChange(this.showFavorites) }
            />))}
        </div>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (isLoading ? <Loading /> : this.renderPage());
  }
}

export default Favorites;
