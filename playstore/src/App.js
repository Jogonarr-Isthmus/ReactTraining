import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import { logInSuccess } from './Reducers/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavBar from './NavBar/NavBar';
import Login from './Login/Login';
import Home from './Home/Home';
import Counter from './Counter/Counter';
import MaintenanceRedux from './MaintenanceRedux/Maintenance';
import { UserMaintenance, GameMaintenance } from './MaintenanceAxios/Maintenance';
import Contador from './Shared/Contador';

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
      <div className="App" >
        <header className="App-header">
          <NavBar />
        </header>
        <div className="App-body">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/Home" />} />
            <Route path="/Login" component={Login} />
            <PrivateRoute path="/Home" component={Home} />
            <PrivateRoute path="/Counter" component={Counter} />
            <PrivateRoute path="/Contador" component={Contador} />
            <PrivateRoute path="/UsersRedux" render={() => <MaintenanceRedux entityName="users" />} />
            <PrivateRoute path="/GamesRedux" render={() => <MaintenanceRedux entityName="games" />} />
            <PrivateRoute path="/UsersAxios" component={UserMaintenance} />
            <PrivateRoute path="/GamesAxios" component={GameMaintenance} />
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