import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CorrectAnswer from './CorrectAnswer';
import WrongAnswer from './WrongAnswer';

class Respostas extends Component {
  render() {
    const { respostasEmbaralhadas } = this.props;
    return (
      <div data-testid="answer-options">
        { respostasEmbaralhadas.map(({ indexTestId, resposta, errada }) => (
          errada ? <WrongAnswer
            key={ indexTestId }
            indexTestId={ indexTestId }
            resposta={ resposta }
          /> : <CorrectAnswer
            key={ indexTestId }
            indexTestId={ indexTestId }
            resposta={ resposta }
          />
        )) }
      </div>
    );
  }
}

export default Respostas;

Respostas.propTypes = {
  respostasEmbaralhadas: PropTypes.instanceOf(Array).isRequired,
};
