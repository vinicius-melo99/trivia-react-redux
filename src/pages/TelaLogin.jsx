import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { adicionaEmail, adicionaNome, thunkToken } from '../redux/actions';
import triviaLogo from '../images/logo_trivia.png';
import iconeTrybe from '../images/icone_trybe.png';
import Loading from '../components/Loading';

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

  saveInLocalStorage = (chave, info) => {
    localStorage.setItem([chave], info);
  };

  handlerClick = async () => {
    const { email, nome } = this.state;
    const { dispatch, history } = this.props;
    dispatch(adicionaEmail(email));
    dispatch(adicionaNome(nome));
    this.setState({
      email: '',
      nome: '',
    });
    const token = await dispatch(thunkToken());
    this.saveInLocalStorage('token', token);
    history.push('/game');
  };

  render() {
    const { nome, email, isDisabled } = this.state;
    const { loading } = this.props;
    return (
      <div className="login-container">
        <img src={ triviaLogo } alt=" Logo Trivia" />
        {
          loading ? <Loading /> : (
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

              <button
                data-testid="btn-settings"
                type="button"
                onClick={ () => {
                  const { history } = this.props;
                  history.push('/configuracao');
                } }
              >
                Configurações
              </button>
            </div>
          )
        }
        <img src={ iconeTrybe } alt="Ícone da Trybe" />
      </div>
    );
  }
}

TelaLogin.propTypes = {
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.loading,
});

export default connect(mapStateToProps)(TelaLogin);
