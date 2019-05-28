import React, { useState } from 'react';
import logo from './logo.svg';
import Counter from './Counter/Counter.js';
import Entities from './Entities/Entities.js';
import './App.css';

function App(props) {
  const [useClassComponent, setUseClassComponent] = useState(props.useClassComponent);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>v{React.version}</p>
      </header>
      <div className="App-body">
        <div class="checkbox">
          <label htmlFor="useClassComponent">
            <input type="checkbox" id="useClassComponent" name="useClassComponent" 
              checked={useClassComponent} onChange={(e) => setUseClassComponent(!useClassComponent)} /> Use Class Component
          </label>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <Counter useClassComponent={useClassComponent}></Counter>
          </div>
          <div className="col-sm-10">
            <Entities useClassComponent={useClassComponent}></Entities>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

App.defaultProps = {
  useClassComponent: true
};

export default App;