import React from 'react';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

const NUMBER_THREE = 3;
class Login extends React.Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickFunction = this.onClickFunction.bind(this);

    this.state = {
      nameInput: '',
      stateButton: false,
      isLoading: false,
    };
  }

  onChangeInput(event) {
    this.setState({
      nameInput: event.target.value,
      stateButton: event.target.value.length > NUMBER_THREE,
    });
  }

  async onClickFunction() {
    this.setState(
      { isLoading: true },
      async () => {
        const { nameInput } = this.state;
        const nameString = {
          name: nameInput,
        };
        await createUser(nameString);
        this.setState(
          { isLoading: false },
        );
      },
    );
  }

  renderInput() {
    const { nameInput, stateButton } = this.state;
    return (
      <>
        <div data-testid="page-login">Login</div>
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.onChangeInput }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          value={ nameInput }
          disabled={ !stateButton }
          onClick={ this.onClickFunction }
        >
          Entrar
        </button>
      </>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>{ isLoading ? <Loading /> : this.renderInput() }</div>
    );
  }
}

export default Login;
