import React, { Component } from 'react';
import './Carregando.css';
import { FaSpinner } from 'react-icons/fa';

class Carregando extends Component {
  render() {
    return (
      <div className='carregando-div'>
        <span className='span-carregando'>Carregando</span>
        <FaSpinner className='loading'/>
      </div>
    );
  }
}

export default Carregando;
