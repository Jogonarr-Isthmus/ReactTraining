import React from 'react';
import './Display.css';

function Display(props) {
  return (
    <div>Total: {props.counter}</div>
  );
}

export default Display;