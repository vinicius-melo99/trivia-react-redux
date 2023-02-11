import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class WrongAnswer extends Component {
  render() {
    const { indexTestId, resposta } = this.props;
    return (
      <button
        data-testid={ `wrong-answer-${indexTestId}` }
      >
        { resposta }
      </button>
    );
  }
}

WrongAnswer.propTypes = {
  indexTestId: PropTypes.string.isRequired,
  resposta: PropTypes.string.isRequired,
};
