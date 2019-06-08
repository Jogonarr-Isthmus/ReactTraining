import React from 'react';
import './Counter.css';

import { increment } from '../Reducers/counter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from './Button/Button';
import Display from './Display/Display';

class Counter extends React.Component {
  onClick = (increment) => {
    this.props.increment(increment);
  }

  render() {
    return (
      <div>
        <h3>Counter</h3>
        <Button onClick={this.onClick} increment={1} />
        <Button onClick={this.onClick} increment={5} />
        <Button onClick={this.onClick} increment={10} />
        <Button onClick={this.onClick} increment={100} />
        <br />
        <Button onClick={this.onClick} increment={-1} />
        <Button onClick={this.onClick} increment={-5} />
        <Button onClick={this.onClick} increment={-10} />
        <Button onClick={this.onClick} increment={-100} />
        <Display counter={this.props.counter} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    increment
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);