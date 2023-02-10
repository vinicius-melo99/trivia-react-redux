import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <h1 data-testid="settings-title">
            Configurações
          </h1>
        </div>
      </header>

    );
  }
}

export default (Header);
