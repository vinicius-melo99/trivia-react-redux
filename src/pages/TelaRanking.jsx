import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { connect } from 'react-redux';
import triviaLogo from '../images/logo_trivia.png';
import { fazLogout } from '../redux/actions';

class TelaRanking extends Component {
  state = {
    playerPoints: [],
  };

  componentDidMount() {
    const playerPoints = JSON.parse(localStorage.getItem('playerPoints'));
    playerPoints.sort((a, b) => b.score - a.score);

    this.setState({ playerPoints });
  }

  redirectToHome = () => {
    const { history, dispatch } = this.props;
    localStorage.setItem('token', '');
    history.push('/');
    dispatch(fazLogout());
  };

  render() {
    const { playerPoints } = this.state;
    return (
      <div className="ranking-container">
        <img className="trivia-logo-ranking" src={ triviaLogo } alt="trivia-logo" />
        <h1 data-testid="ranking-title">RANKING</h1>
        <div className="ranking-position-container">
          {playerPoints.map(({ nome, imgHash, score }, index) => (
            <div className="ranking-position" key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${imgHash}` }
                className="player-image"
                alt=""
              />
              <span data-testid={ `player-name-${index}` }>{ nome }</span>
              <div className="points-container">
                <AiFillStar
                  size="37px"
                  color="#F9BA18"
                />
                <span data-testid={ `player-score-${index}` }>
                  { score }
                  {' '}
                  pontos
                </span>
              </div>
            </div>
          ))}

        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          className="play-again-button"
          onClick={ this.redirectToHome }
        >
          JOGAR NOVAMENTE
        </button>

      </div>
    );
  }
}

TelaRanking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(TelaRanking);
