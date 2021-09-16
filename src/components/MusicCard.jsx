import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.getMusicById = this.getMusicById.bind(this);
    this.updateListSong = this.updateListSong.bind(this);

    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  async getMusicById(event) {
    const valueId = event.target.value;
    this.setState((prevState) => (
      { isLoading: true,
        isChecked: !prevState.isChecked }),
    async () => {
      const musicsList = await getMusics(valueId);
      this.updateListSong(musicsList);
      this.setState({ isLoading: false });
    });
  }

  async updateListSong(idMusic) {
    const { isChecked } = this.state;
    if (isChecked) {
      await addSong(idMusic);
    }
    await removeSong(idMusic);
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
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
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
    const { isLoading } = this.state;
    return (
      <div>
        { !isLoading ? this.componentRender() : <Loading /> }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
