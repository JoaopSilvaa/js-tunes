import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CarregandoPage from '../components/CarregandoPage';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
      disabled: true,
    };
  }

  componentDidMount() {
    this.returnUser();
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const nome = target.name;
    this.setState({
      [nome]: value,
    })
  }

  handleBlur = () => {
    const { name, email, description, image } = this.state;
    let usuario = {}
    if (name !== '' && email !== '' && description !== '' && image !== '') {
      usuario = {name, email, description, image}
      if (Object.values(usuario).length === 4) {
        this.setState ({
          usuario,
          disabled: false
        })
      }
    }
  }

  returnUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      loading: false,
    });
  }

  attUser = async () => {
    const { usuario } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser(({
      name: usuario.name,
      email: usuario.email,
      image: usuario.image,
      description: usuario.description,
    }));
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, name, email, description, image, disabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <CarregandoPage />
          : (
            <div className='form-profileEditPage'>
              <label
                className='label-profile-edit'
              >
                Nome <br />
                <input
                  className='input-profile-edit'
                  type="text"
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                  onBlur={ this.handleBlur }
                  />
              </label>
              <label
                className='label-profile-edit'
              >
                Email <br />
                <input
                  className='input-profile-edit'
                  type="email"
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                  onBlur={ this.handleBlur }
                  />
              </label>
              <label
                className='label-profile-edit'
              >
                Descrição <br />
                <input
                  className='input-profile-edit'
                  type="text"
                  name="description"
                  data-testid="edit-input-description"
                  value={description}
                  onChange={ this.handleChange }
                  onBlur={ this.handleBlur }
                />
              </label>
              <label
                className='label-profile-edit'
              >
                Imagem <br />
                <input
                  className='input-profile-edit'  
                  type="text"
                  name="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleChange }
                  onBlur={ this.handleBlur }
                />
              </label>
              <Link to="/profile">
                <button
                  className='button-save'
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ disabled }
                  onClick={ this.attUser }
                >
                  Salvar Alterações
                </button>
              </Link>
            </div>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
