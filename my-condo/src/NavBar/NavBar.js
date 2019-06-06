import React from 'react';
import './NavBar.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
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
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Maintenance
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/Maintenance/Users/">Users</Link>
                            <Link className="dropdown-item" to="/Maintenance/Estates/">Estates</Link>
                            <Link className="dropdown-item" to="/Maintenance/Amenities/">Amenities</Link>
                            <Link className="dropdown-item" to="/Maintenance/Reservations/">Reservations</Link>
                        </div>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/Maintenance/Users/">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Maintenance/Estates/">Estates</Link>
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
                </ul>
                <span className="navbar-text">
                    <small>v1.0</small>
                </span>
            </div>
        </nav>
    );
}

export default NavBar;