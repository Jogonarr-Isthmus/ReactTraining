import React from 'react';
import './NavBar.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

import { logOut } from '../Reducers/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function NavBar(props) {
    const NavBarHtml = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand">
                    <img src={logo} className="App-logo" alt="React" />
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Counter/">Counter</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Users/">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Games/">Games</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn-link nav-link nav-link-button" type="button" onClick={() => props.logOut()}>Log Off</button>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <small>React v{React.version}</small>
                    </span>
                </div>
            </nav>
        );
    };

    return (
        <div className="NavBar">
            {props.isLogged ? NavBarHtml() : null}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isLogged: state.auth.isLogged
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logOut
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);