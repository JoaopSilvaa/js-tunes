import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Albuns.css';

class Albuns extends Component {
  render() {
    const { image, name, collectionId, id } = this.props;
    return (
      <Link className='link-album' to={ `/album/${id}` } data-testid={ `link-to-album-${collectionId}` }>
        <div className='album'>
          <img className='image-album' src={ image } alt={ name } />
          <span>{ name }</span>
        </div>
      </Link>
    );
  }
}

Albuns.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Albuns;
