import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/TelaGame.css';
import { connect } from 'react-redux';

class CorrectAnswer extends Component {
  selectCSS = () => {
    const btnCorrect = document.querySelector('#defaultCorrect');
    const btnWrong = document.querySelectorAll('#defaultWrong');
    btnCorrect.className = 'correct-answer';
    btnWrong.forEach((btn) => {
      btn.className = 'wrong-answer';
    });
  };

  render() {
    const { resposta, disableButtons } = this.props;
    return (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ () => (this.selectCSS()) }
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
};

const mapStateToProps = (globalState) => {
  const { game: { disableButtons } } = globalState;
  return {
    disableButtons,
  };
};

export default connect(mapStateToProps)(CorrectAnswer);
