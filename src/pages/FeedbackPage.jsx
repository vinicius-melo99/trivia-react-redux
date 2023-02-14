import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeedbackPage extends Component {
  render() {
    return (
      <>
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

      </>
    );
  }
}

FeedbackPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FeedbackPage;
