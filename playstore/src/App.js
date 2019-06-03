import React, { useState } from 'react';
import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import Counter from './Counter/Counter';
import Entities from './Entities/Entities';
import MaintenanceFunc from './Entities/MaintenanceFunc/MaintenanceFunc.js';
import MaintenanceClass from './Entities/MaintenanceClass/MaintenanceClass.js';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

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
            <Route path="/Home" component={Home} />
            <Route path="/Counter" render={() => <Counter useClassComponent={useClassComponent} />} />
            <Route path="/Entities" render={() => <Entities useClassComponent={useClassComponent} users={props.users} games={props.games} />} />
            <Route path="/Entities/Users" render={() => (useClassComponent
              ? <MaintenanceClass entityName="User" entities={props.users}></MaintenanceClass>
              : <MaintenanceFunc entityName="User" entities={props.users}></MaintenanceFunc>
            )} />
            <Route path="/Entities/Games" render={() => (useClassComponent
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
    { Id: 1, Name: 'Jose', Email: 'jose@email.com', Password: 'j0s3' },
    { Id: 2, Name: 'Pablo', Email: 'pablo@email.com', Password: 'p@bl0' },
    { Id: 3, Name: 'Gonzalez', Email: 'gonzalez@email.com', Password: 'g0nz@l3z' },
    { Id: 4, Name: 'Arrieta', Email: 'arrieta@email.com', Password: '@rr13t@' }
  ],
  games: [
    { Id: 1, Name: 'Quake', Rating: '9.0', Type: 'FPS' },
    { Id: 2, Name: 'COD', Rating: '9.5', Type: 'FPS' },
    { Id: 3, Name: 'Mario Kart', Rating: '8.0', Type: 'Racing' },
    { Id: 4, Name: 'Grim Fandango', Rating: '10.0', Type: 'Adventure' }
  ]
};

export default App;