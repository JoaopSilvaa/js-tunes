import React, { Component } from 'react';
import Albuns from '../components/Albuns';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumAPIs from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      albuns: [],
      load: false,
      disableButton: true,
      search: '',
      completed: '',
      artista: '',
    };

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidMount = () => {
    if (!JSON.parse(localStorage.getItem('favorite_songs'))) {
      localStorage.setItem('favorite_songs', JSON.stringify([]));
    }
  }

  handleChangeSearch({ target }) {
    const minLetters = 1;
    const { search } = this.state;
    this.setState({
      search: target.value,
    });
    if (search.length + 1 > minLetters) {
      this.setState({
        disableButton: false,
      });
    }
  }

  handleCds = () => {
    const { albuns } = this.state;
    const cds = albuns
      .map((element) => (<Albuns
        key={ element.collectionId }
        collectionId={ element.collectionId }
        id={ element.collectionId }
        image={ element.artworkUrl100 }
        name={ element.collectionName }
      />));
    return cds;
  }

  showResultAlbuns = () => {
    const { artista, albuns } = this.state;
    if (albuns.length === 0) {
      return (<div  className='result'><span>Nenhum álbum foi encontrado</span></div>);
    }
    return (
      <div className='result'>
        <span>{` Resultado de álbuns de: ${artista}`}</span>
        <div className='musicas'>
          { this.handleCds() }
        </div>
      </div>);
  }

  searchAlbum = async () => {
    const { search } = this.state;
    this.setState({
      load: true,
    });
    const result = await searchAlbumAPIs(search);

    if (result[0] === undefined) {
      this.setState({
        completed: true,
        albuns: [],
        load: false,
      });
    } else {
      this.setState({
        artista: search,
        search: '',
        albuns: result,
        load: false,
        disableButton: true,
        completed: true,
      });
    }
  }

  render() {
    const { search, disableButton, load, completed } = this.state;

    return (
      <div data-testid="page-search" className='search-page'>
        <Header />
        { load ? <Carregando /> : (
          <form className='form-search'>
            <input
              type="text"
              className='input-search'
              data-testid="search-artist-input"
              name="search"
              value={ search }
              onChange={ this.handleChangeSearch }
            />
            <button
              type="button"
              className='button-search'
              data-testid="search-artist-button"
              disabled={ disableButton }
              onClick={ this.searchAlbum }
            >
              Pesquisar
            </button>
          </form>)}

        <div>
          { completed && this.showResultAlbuns() }
        </div>
      </div>
    );
  }
}

export default Search;
