import React, { Component } from 'react';
import Header from '../components/Header';

class TelaConfiguracao extends Component {
  render() {
    return (

      <div>
        <Header />
        <h1 data-testid="settings-title">
          Confiurações
        </h1>
      </div>
    );
  }
}

export default (TelaConfiguracao);
