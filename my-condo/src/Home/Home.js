import React from 'react';
import './Home.css';

import { connect } from 'react-redux';

import backgroundImg from '../Resources/img/EntradaCondominio.jpg';

function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <p>
                Welcome <b>{props.loggedUser.name}</b>!<br />
                Affordable houses near you!!
            </p>
            <img src={backgroundImg} alt="Entrada" />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        loggedUser: state.auth.loggedUser
    };
}

export default connect(
    mapStateToProps
)(Home);