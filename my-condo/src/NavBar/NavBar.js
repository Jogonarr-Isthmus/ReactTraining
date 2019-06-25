import React from 'react';
import './NavBar.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

import { logOut } from '../Reducers/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function NavBar(props) {
    const NavBarHtml = () => {
        const navBarHtml = props.isLogged
            ? (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="navbar-brand">
                        <img src={logo} className="App-logo" alt="MyCondo" />
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
                                <Link className="nav-link" to="/Maintenance/Users/">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Maintenance/Houses/">Houses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Maintenance/Amenities/">Amenities</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Maintenance/Reservations/">Reservations</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About/">About</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn-link nav-link nav-link-button" type="button" onClick={() => props.logOut()}>Log Off</button>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <small>v{props.version}</small>
                        </span>
                    </div>
                </nav>
            )
            : (
                <nav className="navbar navbar-dark bg-dark">
                    <div className="Login-logo">
                        <img src={logo} alt="MyCondo" />
                    </div>
                </nav>
            );

        return navBarHtml;
    };

    return (
        <div className="NavBar">
            {NavBarHtml()}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        version: state.app.version,
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