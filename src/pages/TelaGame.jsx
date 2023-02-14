import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import fetchTriviaApi from '../helpers/fetchTriviaApi';
import Loading from '../components/Loading';
import Respostas from '../components/Respostas';
import { fazLogout, desativaBotoes, adicionaPlacar, ativaBotoes } from '../redux/actions';
import Header from '../components/Header';

class TelaGame extends PureComponent {
  state = {
    perguntas: [],
    indexPergunta: 0,
    respostasEmbaralhadas: [],
    category: '',
    question: '',
    isLoading: false,
    timer: 30,
    respostaCorreta: '',
    difficulty: '',
    showNext: false,
    isDisable: false,
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
      difficulty,
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = perguntas[indexPergunta];
    const respostasEmbaralhadas = this
      .embaralharRespostas(incorrectAnswers, correctAnswer);

    this.setState({
      difficulty,
      category,
      question,
      respostasEmbaralhadas,
      respostaCorreta: correctAnswer,
    });
    this.iniciaTimer();
  };

  verificaTempo = () => {
    const { timer } = this.state;
    if (timer === 0) {
      const { dispatch } = this.props;
      clearInterval(global.timer);
      dispatch(desativaBotoes());
    }
  };

  iniciaTimer = () => {
    const ONE_SECOND = 1000;

    global.timer = setInterval(() => {
      this.setState((state) => ({
        timer: state.timer - 1,
      }), this.verificaTempo);
    }, ONE_SECOND);
  };

  verificaCorreta = (resposta) => {
    const { dispatch } = this.props;
    this.setState({ showNext: true });
    clearInterval(global.timer);
    dispatch(desativaBotoes());
    const { respostaCorreta, timer, difficulty } = this.state;
    let difficultyNumber = 0;
    const tres = 3;
    switch (difficulty) {
    case 'easy':
      difficultyNumber = 1;
      break;
    case 'medium':
      difficultyNumber = 2;
      break;
    case 'hard':
      difficultyNumber = tres;
      break;
    default:
      break;
    }
    const questionPoint = 10;
    if (resposta === respostaCorreta) {
      const currentScore = questionPoint * (difficultyNumber * timer);
      dispatch(adicionaPlacar(currentScore));
    }
  };

  removeColorPergunta = () => {
    const btnCorrect = document.querySelector('#defaultCorrect');
    const btnWrong = document.querySelectorAll('#defaultWrong');
    btnCorrect.className = 'answer-option';
    btnWrong.forEach((btn) => {
      btn.className = 'answer-option';
    });
  };

  proximaPergunta = () => {
    const ultimoIndex = 4;
    const { dispatch, history } = this.props;
    this.setState({ showNext: false, timer: 30 });
    const { indexPergunta } = this.state;
    if (indexPergunta === ultimoIndex) {
      history.push('/feedbackpage');
    }
    dispatch(ativaBotoes());
    this.removeColorPergunta();
    this.setState(
      {
        indexPergunta: indexPergunta + 1,
      },
      this.obterRespostas,
    );
  };

  render() {
    const {
      isLoading,
      respostasEmbaralhadas,
      category,
      question,
      timer,
      showNext,
      isDisable,
    } = this.state;
    if (isLoading || respostasEmbaralhadas.length === 0) return <Loading />;

    return (
      <div className="game-container">
        <Header />
        <div className="main-frame">
          <h2 data-testid="question-category">{ category }</h2>
          <h2 data-testid="question-text">{ question }</h2>
          <Respostas
            verificaCorreta={ this.verificaCorreta }
            respostasEmbaralhadas={ respostasEmbaralhadas }
          />
          <h2>{ timer }</h2>
        </div>
        {
          showNext
        && (
          <button
            type="button"
            onClick={ this.proximaPergunta }
            data-testid="btn-next"
            disabled={ isDisable }
          >
            Next
          </button>)
        }
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
