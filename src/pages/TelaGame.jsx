import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import fetchTriviaApi from '../helpers/fetchTriviaApi';
import Loading from '../components/Loading';
import Respostas from '../components/Respostas';
import { fazLogout } from '../redux/actions';

class TelaGame extends PureComponent {
  state = {
    perguntas: [],
    isLoading: false,
    indexPergunta: 0,
  };

  async componentDidMount() {
    const { history, dispatch } = this.props;
    const ERROR_CODE = 3;
    const TOKEN = localStorage.getItem('token');
    this.setState({ isLoading: true });
    const perguntas = await fetchTriviaApi(TOKEN);
    const { response_code: responseCode, results } = perguntas;

    if (responseCode === ERROR_CODE) {
      dispatch(fazLogout());
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({ isLoading: false, perguntas: results });
    }
  }

  sortearOrdem = (sortearOrdem) => {
    const SORTEADOR = 0.5;
    const ordemEmbaralhada = [...sortearOrdem].sort(() => Math.random() - SORTEADOR);
    return ordemEmbaralhada;
  };

  embaralharRespostas = (respostasErradas, respostaCerta) => {
    const todasRespostas = respostasErradas.map((respostaErrada, index) => ({
      indexTestId: index,
      resposta: respostaErrada,
      errada: true,
    }));
    todasRespostas.push({
      indexTestId: todasRespostas.length,
      resposta: respostaCerta,
      errada: false,
    });
    return this.sortearOrdem(todasRespostas);
  };

  render() {
    const { isLoading, perguntas, indexPergunta } = this.state;
    if (isLoading || perguntas.length === 0) return <Loading />;
    console.log(perguntas);

    const {
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = perguntas[indexPergunta];
    const respostasEmbaralhadas = this
      .embaralharRespostas(incorrectAnswers, correctAnswer);
    return (
      <div className="game-container">
        <div className="main-frame">
          <h2 data-testid="question-category">{ category }</h2>
          <h2 data-testid="question-text">{ question }</h2>
          <Respostas respostasEmbaralhadas={ respostasEmbaralhadas } />
        </div>
      </div>
    );
  }
}

TelaGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(TelaGame);
