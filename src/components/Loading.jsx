import React, { Component } from 'react';
import '../style/Loading.css';
import trivia from '../trivia.png';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-frame">
        <img className="App-logo" src={ trivia } alt="trivia-logo" />
        <div
          className="spinner is-animating"
        />
      </div>
    );
  }
}
