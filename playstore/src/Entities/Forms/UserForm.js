import React, { useState } from 'react';
import './UserForm.css';

function UserForm(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onInsert = () => {
        const newEntity = {
            Id: 0,
            Name: name,
            Email: email,
            Password: password
        };
        props.onInsert(newEntity);

        setName('');
        setEmail('');
        setPassword('');
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
                <label className="col-sm-2 control-label" htmlFor="Email">Email:</label>
                <div className="col-sm-10 input-group">
                    <input type="email" className="form-control" 
                        id='Email'
                        name='Email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="Password">Password:</label>
                <div className="col-sm-10 input-group">
                    <input type="password" className="form-control" 
                        id='Password'
                        name='Password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <br />
            <div className="form-actions">
                <button type="button" className="btn btn-sm btn-primary" onClick={onInsert}>Insert User</button>
            </div>
        </form>
        <br />
    </div>
  );
}

export default UserForm;