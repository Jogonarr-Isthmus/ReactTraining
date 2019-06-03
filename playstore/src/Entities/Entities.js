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

export default Entities;