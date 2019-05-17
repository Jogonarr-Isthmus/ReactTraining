import React from 'react';
import './Usuarios.css';

class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [
            { name: 'Jose', email: 'jose@email.com', password: 'j0s3' },
            { name: 'Pablo', email: 'pablbo@email.com', password: 'p@bl0' },
            { name: 'Gonzalez', email: 'gonzalez@email.com', password: 'g0nz@l3z' },
            { name: 'Arrieta', email: 'arrieta@email.com', password: '@rr13t@' }
        ]
    };
  }

  getUsers = () => {
    let users = this.state.users.map((user) => {
        return <li><b>Name:</b> {user.name}. <b>Email:</b> {user.email}. <b>Password:</b> {user.password}</li>
    });

    return users;
  }

  addUser = (newUser) => {
    var currentUsers = this.state.users;
    currentUsers.push(newUser);

    this.setState({
        users: currentUsers
    });
  }

  render() {
    return (
        <div className="Usuarios">
            <h3>Usuarios</h3>
            <ul className="UserList">
                {this.getUsers()}
            </ul>
        </div>
    );
  }
}

Usuarios.defaultProps = {
    users: []
}

export default Usuarios;