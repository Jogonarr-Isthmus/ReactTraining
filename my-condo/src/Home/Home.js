import React from 'react';
import './Home.css';

import backgroundImg from '../Resources/img/EntradaCondominio.jpg';

function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <p>Affordable houses near you!!</p>
            <img src={backgroundImg} />
        </div>
    );
}

export default Home;