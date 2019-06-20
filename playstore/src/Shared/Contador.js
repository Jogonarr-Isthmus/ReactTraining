import React, { useState, useEffect } from 'react';
import usePar from './usePar';

function Contador() {
    // Declafre a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const [esPar, validaEsPar] = usePar(false);

    //Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log(`You clicked ${count} times`);
    });

    const cambio = () => {
        validaEsPar(count + 1);
        setCount(count + 1);
    };

    return (
        <div>
            <div className="row">
                <div className="col-sm-1">
                    <button className="btn btn-sm btn-primary" onClick={cambio}>Click me!</button>
                </div>
                <div className="col-sm-2">
                    <p>
                        You clicked <b>{count}</b> times!<br />
                        {esPar && "Si"} {!esPar && "No"} es par...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Contador;