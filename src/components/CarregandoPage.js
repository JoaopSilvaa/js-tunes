import React, { Component } from 'react';
import './CarregandoPage.css';
import { FaSpinner } from 'react-icons/fa';

class Carregando extends Component {
  render() {
    return (
      <div className='carregando'>
        <h1 className='carregando-page'>
          Carregando
        </h1>
        <FaSpinner className='loading-page'/>
      </div>
    );
  }
}

export default Carregando;
