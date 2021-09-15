import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class Lista extends React.Component {
  render() {
    const { albunsArray } = this.props;

    const mapArtist = albunsArray.map(({ artistName,
      collectionId, collectionName, artworkUrl100,
    }) => (
      <Link
        key={ collectionId }
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          <img src={ artworkUrl100 } alt="album" />
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </div>
      </Link>
    ));

    return (
      <div>{ mapArtist }</div>
    );
  }
}

export default Lista;

Lista.propTypes = {
  albunsArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
