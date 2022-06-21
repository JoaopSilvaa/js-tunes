import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import FavoriteMusicCard from '../components/FavoriteMusicCard';
import './Favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
      checked: true,
    };
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs ,
      loading: false,
    });
  }


  handleClick = ({ target }) => {
    const { id } = target;
    const number = Number(id);
    const { favoriteSongs } = this.state;
    const checado = target.checked;
    const magicNumber = 1000;
    const timer = () => {
      setTimeout(() => {
        (
          this.setState({
            loading: false,
          })
        );
      }, magicNumber);
    };
    const musica = favoriteSongs.find((music) => music.trackId === number);
    if (checado === false) {
      this.setState({
        loading: true,
      })
      removeSong(musica);
      this.handleNewFavorites();
      timer();
    }
  }

  handleNewFavorites = async () => {
    const newFavoriteSongs = await getFavoriteSongs();
    console.log(newFavoriteSongs);
    this.setState({
      favoriteSongs: newFavoriteSongs
    });
  }

  render() {
    const { username } = this.props;
    const { loading, favoriteSongs, checked } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header user={ username } />
        <div className='favoritas'>
          <h1>Músicas Favoritas</h1>
          {loading ? <Carregando />
            : (
              favoriteSongs && favoriteSongs
              .map((element) => (
                <FavoriteMusicCard
                key={ element.trackId }
                nameMusic={ element.trackName }
                preview={ element.previewUrl }
                trackId={ element.trackId }
                checked={ checked }
                handleClick={this.handleClick}
                />))
                )}
          </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Favorites;
