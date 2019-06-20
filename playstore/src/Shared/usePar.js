import { useState } from 'react';

export default function usePar() {
    const [esPar, validaEsPar] = useState(true);
    const validar = num => {
        let _esPar = (num % 2 === 0);
        validaEsPar(_esPar);
    };

    return [esPar, validar];
};