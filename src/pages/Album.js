import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      artist: '',
      album: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.handleMusics();
    this.handleFavoriteSongs();
  }

  handleFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const favoritesMusics = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesMusics,
    });
  }

  handleMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState({
      musicas: musics,
      artist: musics[0].artistName,
      album: musics[0].collectionName,
    });
  }


  render() {
    const { artist, album, musicas } = this.state;
    const musics = Array.from((musicas));
    musics.shift();
    return (
      <div data-testid="page-album">
        <Header />
        <div className='album-page'>
          <h1 data-testid="artist-name">{artist}</h1>
          <h2 data-testid="album-name">{album}</h2>
          <div>
            { musics.trackName === undefined && musics
              .map((element) => (
                <MusicCard
                key={ element.trackName }
                nameMusic={ element.trackName }
                preview={ element.previewUrl }
                trackId={ element.trackId }
                musicas={ musicas }
                />)) }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
