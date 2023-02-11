import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/TelaGame.css';

export default class CorrectAnswer extends Component {
  selectCSS = () => {
    const btnCorrect = document.querySelector('#defaultCorrect');
    const btnWrong = document.querySelectorAll('#defaultWrong');
    btnCorrect.className = 'correct-answer';
    btnWrong.forEach((btn) => {
      btn.className = 'wrong-answer';
    });
  };

  render() {
    const { resposta } = this.props;
    return (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ () => (this.selectCSS()) }
        id="defaultCorrect"
      >
        { resposta }
      </button>
    );
  }
}

CorrectAnswer.propTypes = {
  resposta: PropTypes.string.isRequired,
};
