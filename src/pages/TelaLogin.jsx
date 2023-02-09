import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { adicionaEmail, adicionaNome } from '../redux/actions';

class TelaLogin extends React.Component {
  state = {
    email: '',
    nome: '',
  };

  inputHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
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
    const { nome, email } = this.state;
    return (
      <div>
        <label>
          <input
            name="email"
            type="email"
            placeholder="Qual é o seu e-mail do gravatar?"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.inputHandler }
          />
        </label>
        <label>
          <input
            name="nome"
            type="password"
            placeholder="Qual é o seu nome?"
            data-testid="input-player-name"
            value={ nome }
            onChange={ this.inputHandler }
          />
        </label>
        <button
          type="button"
          disabled={ !(email && nome) }
          data-testid="btn-play"
          onClick={ this.handlerClick }
        >
          Play
        </button>
      </div>
    );
  }
}

TelaLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(TelaLogin);
