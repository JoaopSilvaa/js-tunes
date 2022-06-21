import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import CarregandoPage from './components/CarregandoPage';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      disable: true,
      pagina: '',
      loading: false,
    };

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
  }

  handleChangeLogin({ target }) {
    const maxLetters = 1;
    const minLetters = 2;
    const { username } = this.state;
    this.setState({
      username: target.value,
    });
    if (username.length > maxLetters) {
      this.setState({
        disable: false,
      });
    } if (username.length < minLetters) {
      this.setState({
        disable: true,
      });
    }
  }

  goToSearch = async () => {
    const { username } = this.state;
    this.setState({
      loading: true,
    });
    const result = await createUser(({ name: username }));
    this.setState({
      pagina: result,
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { disable, username, pagina,
      loading } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            render={
              () => (<Login
                username={ username }
                disable={ disable }
                handleChangeLogin={ this.handleChangeLogin }
                goToSearch={ this.goToSearch }
              />)
            }
            exact
          >
            { loading ? <CarregandoPage /> : pagina && <Redirect to="/search" /> }
          </Route>
          <Route
            path="/search"
            render={
              () => (<Search />)
            }
          />
          <Route path="/album/:id" component={ Album } />
          <Route
            path="/favorites"
            render={
              () => (<Favorites
                username={ username }
              />)
            }
          />
          <Route
            path="/profile"
            render={
              () => (<Profile
                username={ username }
              />)
            }
            exact
          />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
