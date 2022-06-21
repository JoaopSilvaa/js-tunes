import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from '../components/Carregando';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  
  componentDidMount = async () => {
    const { trackId, musicas } = this.props;
    const favoritesMusics = await getFavoriteSongs();
    this.setState({
      musicas,
      favoritesMusics,
    });
    const musica = favoritesMusics.find((music) => music.trackId === trackId);
    musica && this.setState({
      checked: true
    });
  }

  handleClick = async ({ target }) => {
    const { trackId } = this.props;
    const { musicas } = this.state;
    const checado = target.checked;
    const magicNumber = 500;
    const attFavoriteSongs = getFavoriteSongs().then;
    const timer = () => {
      setTimeout(() => {
        (
          this.setState({
            loading: false,
            favoritesMusics: attFavoriteSongs,
          })
        );
      }, magicNumber);
    };
    const musica = musicas.find((music) => music.trackId === trackId);
    if (checado === true) {
      this.setState({
        loading: true,
        checked: checado
      });
      addSong(musica);
      timer();
    }
    if (checado === false) {
      this.setState({
        loading: true,
        checked: checado
      });
      removeSong(musica);
      timer();
    }
  }


  render() {
    const { nameMusic, preview, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <div className='player'>
        <span>{nameMusic}</span>
        <audio data-testid="audio-component" src={ preview } controls>
        </audio>
        { loading ? <Carregando /> : 
        <label htmlFor={ trackId }>
          <input
            className='favorite-check'
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favoritar"
            id={ trackId }
            onChange={ this.handleClick }
            checked={ checked }
            />
          Favorita
        </label>
          }
      </div>
    );
  }
}

MusicCard.propTypes = {
  nameMusic: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
