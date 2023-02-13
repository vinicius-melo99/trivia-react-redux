import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeedbackPage extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="feedback-text">Feedback</h1>
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </div>
        ;
      </>
    );
  }
}

FeedbackPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default (FeedbackPage);
