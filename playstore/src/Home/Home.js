import React from 'react';
import './Home.css';

import { connect } from 'react-redux';

function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <p>
                Welcome <b>{props.loggedUser.Name}</b>!<br />
                This is a practice project for React training...
            </p>
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