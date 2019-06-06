import React, { useState } from 'react';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Counter from './Counter/Counter';
import Entities from './Entities/Entities';
import MaintenanceFunc from './Entities/MaintenanceFunc/MaintenanceFunc.js';
import MaintenanceClass from './Entities/MaintenanceClass/MaintenanceClass.js';

function App(props) {
  const [useClassComponent, setUseClassComponent] = useState(props.useClassComponent);

  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <NavBar useClassComponent={useClassComponent} onChange={setUseClassComponent} />
        </header>
        <div className="App-body">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/Home" />} />
            <Route path="/Home/" component={Home} />
            <Route path="/Counter/" render={() => <Counter useClassComponent={useClassComponent} />} />
            <Route exact path="/Entities/" render={() => <Entities useClassComponent={useClassComponent} users={props.users} games={props.games} />} />
            <Route exact path="/Entities/Users/" render={() => (useClassComponent
              ? <MaintenanceClass entityName="User" entities={props.users}></MaintenanceClass>
              : <MaintenanceFunc entityName="User" entities={props.users}></MaintenanceFunc>
            )} />
            <Route exact path="/Entities/Games/" render={() => (useClassComponent
              ? <MaintenanceClass entityName="Game" entities={props.games}></MaintenanceClass>
              : <MaintenanceFunc entityName="Game" entities={props.games}></MaintenanceFunc>
            )} />
          </Switch>
        </div>
        <br />
      </div>
    </HashRouter>
  );
}

App.defaultProps = {
  useClassComponent: false,
  users: [
    {
      Id: 1,
      Name: 'Jose Pablo',
      LastName: 'Gonzalez Arrieta',
      Email: 'pgonzalez@isthmusit.com',
      Phone: '83411578',
      Username: 'pablo',
      Password: 'p@bl0'
    }
  ],
  games: [
    { Id: 1, Name: 'Quake', Rating: '9.0', Type: 'FPS' },
    { Id: 2, Name: 'COD', Rating: '9.5', Type: 'FPS' },
    { Id: 3, Name: 'Mario Kart', Rating: '8.0', Type: 'Racing' },
    { Id: 4, Name: 'Grim Fandango', Rating: '10.0', Type: 'Adventure' }
  ]
};

export default App;