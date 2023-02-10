import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="main-frame">
        Loading...
        <div
          className="spinner is-animating"
        />
      </div>
    );
  }
}
