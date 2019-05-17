import React from 'react';
import './Sumador.css';

class Sumador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.counter
    };
  }

  onSumar = () => {
    var newCounter = this.state.counter + 1;
    this.setState({
        counter: newCounter
    });
    this.props.onSumar(newCounter);
  }

  render() {
    return (
        <div className="Sumador">
            <span className="CurrentSum">Current Sum: {this.state.counter}</span>
            <button type="button" onClick={this.onSumar}>Sumar</button>
        </div>
    );
  }
}

Sumador.defaultProps = {
    counter: 1
}

export default Sumador;