import React from 'react';
import logo from './logo.svg';
import Sumador from './Sumador/Sumador.js';
import Contador from './Contador/Contador.js';
import Usuarios from './Usuarios/Usuarios.js';
import Juegos from './Juegos/Juegos.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
  }

  onSumar = (counter) => {
    this.setState({
      counter: counter
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Sumador counter={this.state.counter} onSumar={this.onSumar}></Sumador>
          <Contador counter={this.state.counter}></Contador>
          <Usuarios></Usuarios>
          <Juegos></Juegos>
        </header>
      </div>
    );
  }
}

export default App;
