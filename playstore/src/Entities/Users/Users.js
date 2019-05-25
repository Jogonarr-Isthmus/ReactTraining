import React from 'react';
import './Users.css';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        users: this.props.users
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
        <div className="Users">
            <h3>Users</h3>
            <ul className="UserList">
                {this.getUsers()}
            </ul>
        </div>
    );
  }
}

Users.defaultProps = {
  users: [
    { name: 'Jose', email: 'jose@email.com', password: 'j0s3' },
    { name: 'Pablo', email: 'pablo@email.com', password: 'p@bl0' },
    { name: 'Gonzalez', email: 'gonzalez@email.com', password: 'g0nz@l3z' },
    { name: 'Arrieta', email: 'arrieta@email.com', password: '@rr13t@' }
  ]
}

export default Users;