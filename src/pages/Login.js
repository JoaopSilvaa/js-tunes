import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Footer from '../components/Footer';
import { FaRegPlayCircle } from 'react-icons/fa';

class Login extends Component {
  render() {
    const { handleChangeLogin, disable, goToSearch } = this.props;
    return (
      <div data-testid="page-login" className='page-login'>
        <div className='header-login'>
          <h1 className='title-login'>JS Tunes</h1>
          <FaRegPlayCircle className='icon-play'/>
        </div>
        <div className='form-login'>
          <input
            type="text"
            className='input-login'
            data-testid="login-name-input"
            name="login-name"
            placeholder="Login"
            onChange={ handleChangeLogin }
            />
          <button
            type="button"
            className='button-login'
            data-testid="login-submit-button"
            disabled={ disable }
            onClick={ goToSearch }
            >
            Entrar
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  handleChangeLogin: PropTypes.func.isRequired,
  goToSearch: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default Login;
