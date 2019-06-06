import React from 'react';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Users from './Maintenance/Users';
import Estates from './Maintenance/Estates';
import Amenities from './Maintenance/Amenities';
import Reservations from './Maintenance/Reservations';
import About from './About/About';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className="App-body">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/Home/" />} />
            <Route exact path="/Home/" component={Home} />
            <Route exact path="/Maintenance/Users/" component={Users} />} />
            <Route exact path="/Maintenance/Estates/" component={Estates} />} />
            <Route exact path="/Maintenance/Amenities/" component={Amenities} />} />
            <Route exact path="/Maintenance/Reservations/" component={Reservations} />} />
            <Route exact path="/About/" component={About} />
          </Switch>
        </div>
        <br />
      </div>
    </HashRouter>
  );
}

export default App;