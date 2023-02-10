import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { adicionaEmail, adicionaNome } from '../redux/actions';
import triviaLogo from '../images/logo_trivia.png';
import iconeTrybe from '../images/icone_trybe.png';

class TelaLogin extends React.Component {
  state = {
    email: '',
    nome: '',
    isDisabled: true,
  };

  validateFields = () => {
    const MIN_LENGTH_REQUIRED = 0;
    const { email, nome } = this.state;
    const regEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const validPswd = (nome.length > MIN_LENGTH_REQUIRED);
    if (regEmail.test(email) && validPswd) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  inputHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  handlerClick = () => {
    const { email, nome } = this.state;
    const { dispatch } = this.props;
    dispatch(adicionaEmail(email));
    dispatch(adicionaNome(nome));
    this.setState({
      email: '',
      nome: '',
    });
  };

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <div className="login-container">
        <img src={ triviaLogo } alt=" Logo Trivia" />
        <div className="login-form">
          <label>
            <input
              name="email"
              type="email"
              placeholder="Qual é o seu e-mail do gravatar?"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.inputHandler }
              autoComplete="off"
            />
          </label>
          <label>
            <input
              name="nome"
              type="text"
              placeholder="Qual é o seu nome?"
              data-testid="input-player-name"
              value={ nome }
              onChange={ this.inputHandler }
              autoComplete="off"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handlerClick }
            disabled={ isDisabled }
          >
            Play
          </button>
        </div>
        <img src={ iconeTrybe } alt="Ícone da Trybe" />
      </div>
    );
  }
}

TelaLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(TelaLogin);
