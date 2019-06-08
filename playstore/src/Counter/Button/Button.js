import React from 'react';
import './Button.css';

function Button(props) {
  const handleClick = () => props.onClick(props.increment);

  return (
    <button type="button"
      className={props.increment > 0 ? 'btn btn-sm btn-success' : 'btn btn-sm btn-danger'}
      onClick={handleClick}
    >
      {props.increment > 0 ? '+' : ''}{props.increment}
    </button>
  );
}

export default Button;