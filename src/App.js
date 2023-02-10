import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import './style/TelaLogin.css';
import './style/TelaGame.css';
import TelaLogin from './pages/TelaLogin';
import TelaGame from './pages/TelaGame';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header> */}
      <Switch>
        <Route path="/game" component={ TelaGame } />
        <Route exact path="/" component={ TelaLogin } />
      </Switch>
    </div>
  );
}
