import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import './style/TelaLogin.css';
import './style/TelaGame.css';
import Login from './pages/Login';
import TelaGame from './pages/TelaGame';
import TelaConfiguracao from './pages/TelaConfiguracao';
import FeedbackPage from './pages/FeedbackPage';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ TelaGame } />
        <Route exact path="/configuracao" component={ TelaConfiguracao } />
        <Route exact path="/feedbackpage" component={ FeedbackPage } />
      </Switch>

    );
  }
}

export default App;
