import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.getNameInput = this.getNameInput.bind(this);
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getNameInput();
  }

  async getNameInput() {
    const { name } = await getUser();
    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;
    if (loading) { return <Loading />; }
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        <h1 data-testid="header-user-name">{ name }</h1>
      </header>
    );
  }
}

export default Header;
