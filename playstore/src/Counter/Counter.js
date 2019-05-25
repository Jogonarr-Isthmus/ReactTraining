import React from 'react';
import './Counter.css';
import CounterFunc from './CounterFunc/CounterFunc.js';
import CounterClass from './CounterClass/CounterClass.js';

function Counter(props) {
  return (
    <div>
      <h3>Counter</h3>
      <CounterFunc counter={5}></CounterFunc>
        <br />
      <CounterClass counter={10}></CounterClass>
    </div>
  );
}

export default Counter;