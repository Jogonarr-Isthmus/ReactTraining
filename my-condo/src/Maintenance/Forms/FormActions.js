import React from 'react';
import './FormActions.css';

function FormActions(props) {
    const buttonText = props.isNew ? 'Insert' : 'Edit';
    return (
        <div className="FormActions">
            <button type="submit" className="btn btn-sm btn-primary" disabled={props.isSubmitting}>{buttonText}</button>
            <button type="button" className="btn btn-sm btn-danger" onClick={() => props.onClose()}>Cancel</button>
        </div>
    );
}

export default FormActions;