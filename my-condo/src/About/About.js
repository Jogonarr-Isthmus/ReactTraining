import React from 'react';
import './About.css';

function About(props) {
    return (
        <div>
            <h1>Caracteristicas Y Beneficios</h1>
            <div className="row">
                <div className="col-sm-6">
                    <ul>
                        <li>Seguridad 24/7 con acceso electrónico automatizado.</li>
                        <li>Planta de tratamiento de aguas residuales.</li>
                        <li>Autoabastecimiento de agua potable</li>
                        <li>Electrificación subterránea.</li>
                        <li>Tapias perimetrales.</li>
                    </ul>
                </div>
                <div className="col-sm-6">
                    <ul>
                        <li>Aceras y calles adoquinadas con amplias vías internas.</li>
                        <li>10.000m2 de zonas verdes, áreas comunes, BBQ y piscinas.</li>
                        <li>Rápido acceso a la ruta 27 y a otras rutas cercanas.</li>
                        <li>Clima óptimo para vivir, libre del ruido de la ciudad.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;