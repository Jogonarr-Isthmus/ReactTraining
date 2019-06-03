import React from 'react';
import './Counter.css';
import CounterFunc from './CounterFunc/CounterFunc.js';
import CounterClass from './CounterClass/CounterClass.js';

function Counter(props) {
  const getCounter = () => {
    if (props.useClassComponent) {
      return <CounterClass counter={0}></CounterClass>
    } else {
      return <CounterFunc counter={0}></CounterFunc>
    }
  };

  return (
    <div className="Counter">
      {getCounter()}
    </div>
  );
}

export default Counter;