import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import { logInSuccess } from './Reducers/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavBar from './NavBar/NavBar';
import Login from './Login/Login';
import Home from './Home/Home';
import { UsersMaintenance, HousesMaintenance } from './Maintenance/MaintenanceAxios';
import { AmenitiesMaintenance, ReservationsMaintenance } from './Maintenance/MaintenanceRedux';
import About from './About/About';

class App extends React.Component {
  componentDidMount() {
    let isLogged = localStorage.getItem('isLogged');
    if (isLogged) {
      let user = localStorage.getItem('user');
      this.props.logInSuccess(JSON.parse(user));
    }
  }

  render() {
    const PrivateRoute = ({ component: Component, render: Render, ...rest }) => {
      let isLogged = localStorage.getItem('isLogged');

      return (
        <Route {...rest} render={(props) => {
          return (
            props.isLogged === true || isLogged
              ? (Component ? <Component {...props} /> : Render())
              : <Redirect to="/Login" />
          );
        }} />
      );
    };

    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className="App-body">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/Home/" />} />
            <Route path="/Login" component={Login} />
            <PrivateRoute exact path="/Home/" component={Home} />
            <PrivateRoute exact path="/Maintenance/Users/" component={UsersMaintenance} />
            <PrivateRoute exact path="/Maintenance/Houses/" component={HousesMaintenance} />
            <PrivateRoute exact path="/Maintenance/Amenities/" component={AmenitiesMaintenance} />
            <PrivateRoute exact path="/Maintenance/Reservations/" component={ReservationsMaintenance} />
            <PrivateRoute exact path="/About/" component={About} />
          </Switch>
        </div>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.auth.isLogged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logInSuccess
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);