import React, { useState } from 'react';
import './CounterFunc.css';
import Button from '../Button/Button.js';
import Display from '../Display/Display.js';

function CounterFunc(props) {
  const [counter, setCounter] = useState(props.counter);
  const incrementCounter = (increment) => setCounter(counter + increment)

  return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Button onClickFunction={incrementCounter} increment={100} />
      <Display counterType="Func" counter={counter} />
    </div>
  );
}

CounterFunc.defaultProps = {
  counter: 0
}

export default CounterFunc;