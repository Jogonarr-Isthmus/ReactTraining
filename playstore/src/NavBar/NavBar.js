import React from 'react';
import './NavBar.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <div className="NavBar">
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
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Counter/">Counter</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/Entities/">All Entities</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/Entities/Maintenance/Users/">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Entities/Maintenance/Games/">Games</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle bg-dark" href="javascript:void(0)" id="navbarDropdown"
                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            >
                                Entities
                            </button>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/Entities/Users/">Users</Link>
                                <Link className="dropdown-item" to="/Entities/Games/">Games</Link>
                            </div>
                        </li> */}
                    </ul>
                    <span className="navbar-text">
                        <small>React v{React.version}</small>
                    </span>
                </div>
            </nav>
            <nav className="navbar navbar-dark bg-dark settings">
                <div className="bg-dark">
                    <div className="bg-dark checkbox">
                        <label htmlFor="useClassComponent">
                            <input type="checkbox" id="useClassComponent" name="useClassComponent"
                                style={{ fontSize: '10px' }}
                                checked={props.useClassComponent}
                                onChange={() => props.onChange(!props.useClassComponent)}
                            />
                            &nbsp;Use ClassComponent for State handling
                        </label>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;