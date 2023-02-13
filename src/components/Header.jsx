import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import '../style/Header.css';
import { generateHash } from '../utils.js/emailHash';
// import iconButton from '../images/setup-icon.png';

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
          <h3>Pontos: </h3>
          <h3 data-testid="header-score">
            {score}
          </h3>
        </div>
        <button className="config-button">
          Configurações
        </button>
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
