import React from 'react';
import './Entities.css';

import MaintenanceFunc from './MaintenanceFunc/Maintenance';
import MaintenanceClass from './MaintenanceClass/Maintenance';

function Entities(props) {
  const getEntities = () => {
    if (props.useClassComponent) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-12">
              <MaintenanceClass entityName="User" entities={props.users}></MaintenanceClass>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <MaintenanceClass entityName="Game" entities={props.games}></MaintenanceClass>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-sm-12">
              <MaintenanceFunc entityName="User" entities={props.users}></MaintenanceFunc>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <MaintenanceFunc entityName="Game" entities={props.games}></MaintenanceFunc>
            </div>
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