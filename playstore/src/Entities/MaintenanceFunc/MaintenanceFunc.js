import React, { useState } from 'react';
import './MaintenanceFunc.css';
import UserForm from '../Forms/UserForm.js';
import GameForm from '../Forms/GameForm.js';
import List from '../List/List.js';

function MaintenanceFunc(props) {
    const [entities, setEntities] = useState(props.entities);

    const getMaxId = () => {
        let maxId = 0;

        entities.forEach(function (entity, entityIndex) {
            if (entity.Id >= maxId) {
                maxId = entity.Id;
            }
        });

        return maxId;
    };

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [' + props.entityName + 's].');

        console.log('[' + props.entityName + 's]: ', entities);

        let newId = getMaxId() + 1;
        newEntity.Id = newId;

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push(newEntity);

        setEntities(updatedEntities);

        console.log('[' + props.entityName + 's]: ', entities);
    };

    const deleteEntity = (index) => {
        console.log('Delete Entity from [' + props.entityName + 's].');

        console.log('[' + props.entityName + 's]: ', entities);

        console.log('Index to delete = ', index);
        
        if (index >= 0) {
            let updatedEntities = entities;
            updatedEntities.splice(index, 1);

            setEntities(updatedEntities);
        }

        console.log('[' + props.entityName + 's]: ', entities);
    };

    let entityForm = '';
    switch(props.entityName) {
        case 'User':
            entityForm = <UserForm onInsert={insertEntity}></UserForm>;
            break;
        case 'Game':
            entityForm = <GameForm onInsert={insertEntity}></GameForm>;
            break;
        default:
            entityForm = <div></div>;
    }

    return (
        <div className="MaintenanceFunc">
            <h3>{props.entityName}s <small>Func</small></h3>
            {entityForm}
            <List entities={entities} onDelete={deleteEntity}></List>
        </div>
    );
}

export default MaintenanceFunc;