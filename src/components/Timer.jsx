import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BiTime } from 'react-icons/bi';

export default class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <div className="timer">
        <BiTime
          size="1.5em"
          color="#EA5D5D"
        />
        <h2>Tempo :</h2>
        <h2>{ timer }</h2>
        <h2>s</h2>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};
