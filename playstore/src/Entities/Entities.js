import React from 'react';
import './Entities.css';
import MaintenanceFunc from './MaintenanceFunc/MaintenanceFunc.js';
import MaintenanceClass from './MaintenanceClass/MaintenanceClass.js';

function Entities(props) {
  const getEntities = () => {
    if (props.useClassComponent) {
      return (
        <div className="row">
          <div className="col-sm-6">
            <MaintenanceClass entityName="User" entities={props.users}></MaintenanceClass>
          </div>
          <div className="col-sm-6">
            <MaintenanceClass entityName="Game" entities={props.games}></MaintenanceClass>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col-sm-6">
            <MaintenanceFunc entityName="User" entities={props.users}></MaintenanceFunc>
          </div>
          <div className="col-sm-6">
            <MaintenanceFunc entityName="Game" entities={props.games}></MaintenanceFunc>
          </div>
        </div>
      )
    }
  };
  return (
    <div className="Entities">
      <h3>Entities</h3>
      {getEntities()}
    </div>
  );
}

Entities.defaultProps = {
  useClassComponent: true,
  users: [
    { Id: 1, Name: 'Jose', Email: 'jose@email.com', Password: 'j0s3' },
    { Id: 2, Name: 'Pablo', Email: 'pablo@email.com', Password: 'p@bl0' },
    { Id: 3, Name: 'Gonzalez', Email: 'gonzalez@email.com', Password: 'g0nz@l3z' },
    { Id: 4, Name: 'Arrieta', Email: 'arrieta@email.com', Password: '@rr13t@' }
  ],
  games: [
    { Id: 1, Name: 'Quake', Rating: '9.0', Type: 'FPS' },
    { Id: 2, Name: 'COD', Rating: '9.5', Type: 'FPS' },
    { Id: 3, Name: 'Mario Kart', Rating: '8.0', Type: 'Racing' },
    { Id: 4, Name: 'Grim Fandango', Rating: '10.0', Type: 'Adventure' }
  ]
};

export default Entities;