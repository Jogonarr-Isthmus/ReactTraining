import React, { useState } from 'react';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Counter from './Counter/Counter';
import UsersFunc from './Entities/MaintenanceFunc/Users';
import GamesFunc from './Entities/MaintenanceFunc/Games';
import UsersClass from './Entities/MaintenanceClass/Users';
import GamesClass from './Entities/MaintenanceClass/Games';

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
            <Route exact path="/" render={() => <Redirect to="/Home/" />} />
            <Route path="/Home/" component={Home} />
            <Route path="/Counter/" render={() => <Counter useClassComponent={useClassComponent} />} />
            <Route exact path="/Entities/Maintenance/Users/" render={() => useClassComponent ? <UsersClass /> : <UsersFunc />} />
            <Route exact path="/Entities/Maintenance/Games/" render={() => useClassComponent ? <GamesClass /> : <GamesFunc />} />
          </Switch>
        </div>
        <br />
      </div>
    </HashRouter>
  );
}

App.defaultProps = {
  useClassComponent: false
};

export default App;