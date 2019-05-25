import React from 'react';
import logo from './logo.svg';
import Counter from './Counter/Counter.js';
import Entities from './Entities/Entities.js'
import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <p>v{React.version}</p>
        <Counter></Counter>
        <Entities></Entities>
      </div>
    </div>
  );
}

export default App;