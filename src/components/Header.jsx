import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/Header.css';
import { generateHash } from '../utils.js/emailHash';
import star from '../images/star.png';

class Header extends Component {
  render() {
    const { nome, email, score } = this.props;
    const HASH = generateHash(email);
    return (
      <header className="header-container">
        <div className="avatar">
          <img
            src={ `https://www.gravatar.com/avatar/${HASH}` }
            alt="https://br.gravatar.com/"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">
            {nome}
          </h3>
        </div>
        <div className="score">
          <img src={ star } alt="star-icon" />
          <h3>Pontos: </h3>
          <h3 data-testid="header-score">
            {score}
          </h3>
        </div>
        <button
          type="button"
          aria-label="settings"
          className="icon-settings"
        />
      </header>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  nome: globalState.user.nome,
  email: globalState.user.email,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Header);
