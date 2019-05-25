import React from 'react';
import './Entities.css';
import List from './List/List.js'

function Entities(props) {
    const users = [
      { Name: 'Jose', Email: 'jose@email.com', Password: 'j0s3' },
      { Name: 'Pablo', Email: 'pablo@email.com', Password: 'p@bl0' },
      { Name: 'Gonzalez', Email: 'gonzalez@email.com', Password: 'g0nz@l3z' },
      { Name: 'Arrieta', Email: 'arrieta@email.com', Password: '@rr13t@' }
    ];
    const games = [
      { Name: 'Quake', Rating: '9.0', Type: 'FPS' },
      { Name: 'COD', Rating: '9.5', Type: 'FPS' },
      { Name: 'Mario Kart', Rating: '8.0', Type: 'Racing' },
      { Name: 'Grim Fandango', Rating: '10.0', Type: 'Adventure' }
    ];

  return (
    <div>
        <List title="Users" entities={users}></List>
        <List title="Games" entities={games}></List>
    </div>
  );
}

export default Entities;