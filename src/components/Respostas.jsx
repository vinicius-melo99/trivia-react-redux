import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CorrectAnswer from './CorrectAnswer';
import WrongAnswer from './WrongAnswer';

class Respostas extends Component {
  render() {
    const { respostasEmbaralhadas, verificaCorreta } = this.props;
    return (
      <div className="answers" data-testid="answer-options">
        { respostasEmbaralhadas.map(({ indexTestId, resposta, errada }) => (
          errada ? <WrongAnswer
            key={ indexTestId }
            indexTestId={ indexTestId }
            resposta={ resposta }
            verificaCorreta={ verificaCorreta }
          /> : <CorrectAnswer
            key={ indexTestId }
            indexTestId={ indexTestId }
            resposta={ resposta }
            verificaCorreta={ verificaCorreta }
          />
        )) }
      </div>
    );
  }
}

export default Respostas;

Respostas.propTypes = {
  respostasEmbaralhadas: PropTypes.instanceOf(Array).isRequired,
  verificaCorreta: PropTypes.func.isRequired,
};
