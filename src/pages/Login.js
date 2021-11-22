import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginEnter } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      hasButtonDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.checkPasswordAndEmail = this.checkPasswordAndEmail.bind(this);
    this.changeButtonDisabled = this.changeButtonDisabled.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInputChange({ target }) { // Altera o estado pelo formulario
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.changeButtonDisabled);
  }

  onButtonClick(e) { // Salva o e-mail no estado do redux e renderiza uma nova pagina
    e.preventDefault();
    const { history, saveEmailDispatch } = this.props;
    const { email } = this.state;

    saveEmailDispatch(email);
    history.push('/carteira');
  }

  changeButtonDisabled() { // Decide se o botão  de login deve ficar ativado ou desativado
    this.setState({
      hasButtonDisabled: this.checkPasswordAndEmail(),
    });
  }

  checkPasswordAndEmail() { // Verifica se está dentro dos requisitos para logar
    const { email, password } = this.state;
    const MIN_CHAR_PASSWORD = 6;
    if (!email || !password) return true;
    if (email.includes('@')
      && email.includes('.com') && password.length >= MIN_CHAR_PASSWORD) return false;
    return true;
  }

  render() {
    const { email, password, hasButtonDisabled } = this.state;
    return (
      <section>
        <header>
          Login
        </header>
        <form>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
          />
          <input
            type="text"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            disabled={ hasButtonDisabled }
            onClick={ this.onButtonClick }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmailDispatch: (email) => dispatch(loginEnter(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveEmailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
