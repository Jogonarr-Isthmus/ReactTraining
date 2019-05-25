import React from 'react';
import './Display.css';

function Display(props) {
  return (
    <div>Counter {props.counterType}: {props.counter}</div>
  );
}

export default Display;