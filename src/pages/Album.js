/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../components/Header';
import ListaMusicas from '../components/ListaMusicas';
import getMusics from '../services/musicsAPI';

const SEVEN = 7;

class Album extends React.Component {
  constructor() {
    super();
    this.getIdList = this.getIdList.bind(this);

    this.state = {
      isAPI: false,
      arrayMusic: [''],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.getIdList();
  }

  async getIdList() {
    this.setState(
      { isAPI: false },
      async () => {
        const { location: { pathname } } = this.props;
        const idAlbum = pathname.substring(SEVEN);
        const musicsList = await getMusics(idAlbum);
        this.setState(
          { isAPI: true,
            arrayMusic: musicsList,
            artistName: musicsList[0].artistName,
            albumName: musicsList[0].collectionName },
        );
      },
    );
  }

  render() {
    const { arrayMusic, isAPI, artistName, albumName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h3 data-testid="artist-name">{ artistName }</h3>
          <h4 data-testid="album-name">{ albumName }</h4>
          { isAPI && <ListaMusicas musicsArray={ arrayMusic } /> }
        </div>
      </>
    );
  }
}

export default Album;
