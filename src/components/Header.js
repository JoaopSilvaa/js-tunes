import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Header.css';
import { FaSearch, FaStar, FaUserCircle } from 'react-icons/fa';


class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: '',
    };
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const result = await getUser();
    this.setState({
      username: result.name,
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, username } = this.state;
    return (
      <header data-testid="header-component" className='header'>
        <span data-testid="header-user-name">
          { loading ? <Carregando /> : <span>{ username }</span>}
        </span>
        <Link to="/search" data-testid="link-to-search" className='link-header'> <FaSearch /> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites" className='link-header'> <FaStar /> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile" className='link-header'> <FaUserCircle /> Profile </Link>
      </header>
    );
  }
}

export default Header;
