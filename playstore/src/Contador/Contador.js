import React from 'react';
import './Contador.css';

function Contador(props) {
    return (
        <div className="Contador">
            <span>Current Count: {props.counter}</span>
        </div>
    );
}

export default Contador;