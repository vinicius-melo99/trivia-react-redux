import React, { PureComponent } from 'react';
import Header from '../components/Header';

export default class TelaGame extends PureComponent {
  render() {
    return (
      <div className="game-container">
        <Header />
        <div className="main-frame">
          <h1>TELA GAME</h1>
        </div>
      </div>
    );
  }
}
