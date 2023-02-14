import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { email, nome, score } = this.props;
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

const mapStateToProps = (globalState) => ({
  nome: globalState.user.nome,
  email: globalState.user.email,
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(FeedbackPage);
