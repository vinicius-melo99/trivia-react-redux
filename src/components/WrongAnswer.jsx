import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/TelaGame.css';
import { connect } from 'react-redux';

class WrongAnswer extends Component {
  selectCSS = () => {
    const btnCorrect = document.querySelector('#defaultCorrect');
    const btnWrong = document.querySelectorAll('#defaultWrong');
    btnCorrect.className = 'correct-answer';
    btnWrong.forEach((btn) => {
      btn.className = 'wrong-answer';
    });
  };

  render() {
    const { indexTestId, resposta, disableButtons } = this.props;
    return (
      <button
        data-testid={ `wrong-answer-${indexTestId}` }
        onClick={ () => (this.selectCSS()) }
        id="defaultWrong"
        disabled={ disableButtons }
      >
        { resposta }
      </button>
    );
  }
}

WrongAnswer.propTypes = {
  indexTestId: PropTypes.string.isRequired,
  resposta: PropTypes.string.isRequired,
  disableButtons: PropTypes.bool.isRequired,
};

const mapStateToProps = (globalState) => {
  const { game: { disableButtons } } = globalState;
  return {
    disableButtons,
  };
};

export default connect(mapStateToProps)(WrongAnswer);
