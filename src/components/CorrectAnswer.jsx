import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CorrectAnswer extends Component {
  render() {
    const { resposta } = this.props;
    return (
      <button
        data-testid="correct-answer"
      >
        { resposta }
      </button>
    );
  }
}

CorrectAnswer.propTypes = {
  resposta: PropTypes.string.isRequired,
};
