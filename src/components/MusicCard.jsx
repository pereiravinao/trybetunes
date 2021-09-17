import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.getMusicById = this.getMusicById.bind(this);
    this.updateListSong = this.updateListSong.bind(this);
    const { isChecked } = this.props;
    this.state = {
      isLoading: false,
      isChecked,
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async getMusicById(event) {
    const valueId = event.target.value;
    this.setState((prevState) => (
      { isLoading: true,
        isChecked: !prevState.isChecked }),
    async () => {
      const musicsList = await getMusics(valueId);
      this.updateListSong(musicsList[0]);
      this.setState({ isLoading: false });
    });
  }

  async updateListSong(idMusic) {
    const { onChange } = this.props;

    const { isChecked } = this.state;
    if (isChecked) {
      await addSong(idMusic);
    } else {
      await removeSong(idMusic);
      if (onChange) { return onChange(); }
    }
  }

  async fetchFavoriteSongs() {
    // PR do Michael Caxias - Parte para checagem se a musica já estava ok
    const { trackId } = this.props;
    const getSongs = await getFavoriteSongs();
    const songId = getSongs.some((song) => song.trackId === trackId);
    if (songId) {
      this.setState({ isChecked: true });
    }
  }

  componentRender() {
    const { isChecked } = this.state;

    const { previewUrl, trackName, trackId } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackId }
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            value={ trackId }
            onChange={ this.getMusicById }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }

  render() {
    const { onChange } = this.props;
    console.log(onChange);
    const { isLoading } = this.state;
    return (isLoading ? <Loading /> : this.componentRender());
  }
}

export default MusicCard;

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
