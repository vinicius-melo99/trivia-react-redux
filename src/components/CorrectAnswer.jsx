import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/TelaGame.css';
import { connect } from 'react-redux';

class CorrectAnswer extends Component {
  perguntaColor = ({ target: { name } }) => {
    const btnCorrect = document.querySelector('#defaultCorrect');
    const btnWrong = document.querySelectorAll('#defaultWrong');
    const { verificaCorreta } = this.props;
    btnCorrect.className = 'correct-answer';
    btnWrong.forEach((btn) => {
      btn.className = 'wrong-answer';
    });
    verificaCorreta(name);
  };

  render() {
    const { resposta, disableButtons } = this.props;
    return (
      <button
        name={ resposta }
        type="button"
        data-testid="correct-answer"
        onClick={ this.perguntaColor }
        id="defaultCorrect"
        disabled={ disableButtons }
      >
        { resposta }
      </button>
    );
  }
}

CorrectAnswer.propTypes = {
  resposta: PropTypes.string.isRequired,
  disableButtons: PropTypes.bool.isRequired,
  verificaCorreta: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => {
  const { game: { disableButtons } } = globalState;
  return {
    disableButtons,
  };
};

export default connect(mapStateToProps)(CorrectAnswer);
