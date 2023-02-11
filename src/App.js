import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import './style/TelaLogin.css';
import './style/TelaGame.css';
import Login from './pages/Login';
import TelaGame from './pages/TelaGame';
import TelaConfiguracao from './pages/TelaConfiguracao';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ TelaGame } />
        <Route exact path="/configuracao" component={ TelaConfiguracao } />
      </Switch>

    );
  }
}

export default App;
