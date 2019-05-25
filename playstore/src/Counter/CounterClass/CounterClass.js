import React from 'react';
import './CounterClass.css';
import Button from '../Button/Button.js';
import Display from '../Display/Display.js';

class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.counter
    };
  }

  incrementCounter = (increment) => {
    let newCounter = this.state.counter + increment;
    this.setState({
        counter: newCounter
    });
  }

  render() {
    return (
      <div>
        <Button onClickFunction={this.incrementCounter} increment={1} />
        <Button onClickFunction={this.incrementCounter} increment={5} />
        <Button onClickFunction={this.incrementCounter} increment={10} />
        <Button onClickFunction={this.incrementCounter} increment={100} />
        <Display counterType="Class" counter={this.state.counter} />
      </div>
    );
  }
}

CounterClass.defaultProps = {
  counter: 0
}

export default CounterClass;