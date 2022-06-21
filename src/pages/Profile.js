import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CarregandoPage from '../components/CarregandoPage';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';
import Footer from '../components/Footer';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      usuario: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.returnUser();
  }

  returnUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      usuario: user,
      loading: false,
    });
  }

  render() {
    const { loading, usuario } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className='page-profile' >
          {loading ? <CarregandoPage />
            : (
              <div className='profile'>
                <div className='top'> 
                  <img
                    className='photo'
                    src={ usuario.image }
                    alt={ usuario.name }
                    data-testid="profile-image"
                    />
                    <Link className='goto-edit' to="/profile/edit">Editar perfil</Link>
                </div>
                <p className='titles'>Nome</p>
                <p className='descriptions'>{usuario.name}</p>
                <p className='titles'>Email</p>
                <p className='descriptions'>{usuario.email}</p>
                <p className='titles'>Descrição</p>
                <p className='descriptions'>{usuario.description}</p>
              </div>)}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
