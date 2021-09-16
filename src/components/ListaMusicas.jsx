import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

class ListaMusicas extends React.Component {
  render() {
    const { musicsArray } = this.props;
    const newArray = musicsArray.slice(1);
    return (
      <div>
        { newArray.map(({ previewUrl, trackName, trackId }, idx) => (
          <MusicCard
            key={ idx }
            previewUrl={ previewUrl }
            trackName={ trackName }
            trackId={ trackId }
          />))}
      </div>
    );
  }
}

export default ListaMusicas;

ListaMusicas.propTypes = {
  musicsArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
