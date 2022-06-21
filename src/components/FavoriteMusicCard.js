import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FavoriteMusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: true,
    };
  }
  
  render() {
    const { nameMusic, preview, trackId, handleClick, checked } = this.props;
    return (
      <div className='player'>
        <span>{nameMusic}</span>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          <input
            className='favorite-check'
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favoritar"
            id={ trackId }
            onChange={ handleClick }
            checked={ checked }
            />
          Favorita
        </label>
      </div>
    );
  }
}

FavoriteMusicCard.propTypes = {
  nameMusic: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FavoriteMusicCard;
