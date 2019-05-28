import React from 'react';
import './Button.css';

function Button(props) {
  const handleClick = () => props.onClickFunction(props.increment);
  return (
    <button type="button" className="btn btn-sm btn-primary" onClick={handleClick}>
      +{props.increment}
    </button>
  );
}

export default Button;