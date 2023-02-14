import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/FeedbackPage.css';
import { generateHash } from '../utils.js/emailHash';

class FeedbackPage extends Component {
  feedbackMessage = () => {
    const { assertions } = this.props;
    const number = 3;
    if (assertions >= number) {
      return 'Well Done!';
    }

    return 'Could be better...';
  };

  render() {
    const { email, nome, score, assertions } = this.props;
    const HASH = generateHash(email);
    return (
      <div className="feedback-frame">
        <img
          src={ `https://www.gravatar.com/avatar/${HASH}` }
          alt="https://br.gravatar.com/"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">
          { nome }
        </h2>
        <h2 data-testid="header-score">
          { score }
        </h2>
        <p data-testid="feedback-text">
          { this.feedbackMessage() }
        </p>
        <div className="final-score">
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <div>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ () => {
              const { history } = this.props;
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}
FeedbackPage.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

FeedbackPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  nome: globalState.user.nome,
  email: globalState.user.email,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(FeedbackPage);
