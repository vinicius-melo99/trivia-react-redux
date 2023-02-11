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
    respostasEmbaralhadas: [],
    category: '',
    question: '',
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
      this.setState(
        { isLoading: false, perguntas: results },
        this.obterRespostas,
      );
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

  obterRespostas = () => {
    const { perguntas, indexPergunta } = this.state;
    const {
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = perguntas[indexPergunta];
    const respostasEmbaralhadas = this
      .embaralharRespostas(incorrectAnswers, correctAnswer);

    this.setState({
      category,
      question,
      respostasEmbaralhadas,
    });
  };

  render() {
    const {
      isLoading,
      respostasEmbaralhadas,
      category,
      question,
    } = this.state;
    if (isLoading || respostasEmbaralhadas.length === 0) return <Loading />;

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
