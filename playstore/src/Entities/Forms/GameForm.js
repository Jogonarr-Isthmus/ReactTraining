import React, { useState } from 'react';
import './GameForm.css';

function GameForm(props) {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [type, setType] = useState('');

    const onInsert = () => {
        const newEntity = {
            Id: 0,
            Name: name,
            Rating: rating,
            Type: type
        };
        props.onInsert(newEntity);

        setName('');
        setRating('');
        setType('');
    };

  return (
    <div>
        <form className="form form-horizontal form-compact">
            <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="Name">Name:</label>
                <div className="col-sm-10 input-group">
                    <input type="text" className="form-control" 
                        id='Name'
                        name='Name'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="Rating">Rating:</label>
                <div className="col-sm-10 input-group">
                    <input type="text" className="form-control" 
                        id='Rating'
                        name='Rating'
                        placeholder='Rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="Type">Type:</label>
                <div className="col-sm-10 input-group">
                    <input type="text" className="form-control" 
                        id='Type'
                        name='Type'
                        placeholder='Type'
                        value={type}
                        onChange={(e) => setType(e.target.value)}/>
                </div>
            </div>
            <br />
            <div className="form-actions">
                <button type="button" className="btn btn-sm btn-primary" onClick={onInsert}>Insert Game</button>
            </div>
        </form>
        <br />
    </div>
  );
}

export default GameForm;