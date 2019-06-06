import React, { useState } from 'react';
import './Maintenance.css';

import Form from '../Forms/GameForm';
import List from '../List/List.js';

function Games(props) {
    const [entities, setEntities] = useState(props.entities);
    const [formIsActive, setFormIsActive] = useState(false);
    const [formEntity, setFormEntity] = useState({});

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [Games].');
        console.log('[Games]: ', entities);

        let newId = 1;
        if (entities && entities.length > 0) {
            const entityIds = entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        setEntities(updatedEntities);

        console.log('[Games]: ', entities);
    };

    const loadEditForm = (entity, index) => {
        console.log('entity: ', entity);

        setFormIsActive(true);
        setFormEntity({ ...entity, Index: index });
    };

    const editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [Games].');
        console.log('[Games]: ', entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...entities];
        updatedEntities[index] = entityToUpdate;

        setEntities(updatedEntities);

        console.log('[Games]: ', entities);
    };

    const deleteEntity = (id) => {
        console.log('Delete Entity from [Games].');
        console.log('[Games]: ', entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...entities].filter(entity => entity.Id !== id);

            setEntities(updatedEntities);
        }

        console.log('[Games]: ', entities);
    };

    const onFormClose = () => {
        setFormEntity({});
        setFormIsActive(false);
    };

    return (
        <div className="Maintenance">
            <h3>Games <small>Maintenance</small></h3>
            {formIsActive
                ? <Form entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />
                : (
                    <div>
                        <div className="MaintenanceHeader">
                            <button className="btn btn-sm btn-success" onClick={() => setFormIsActive(true)}>+ New Game</button>
                        </div>
                        <List entities={entities} onEdit={loadEditForm} onDelete={deleteEntity} />
                    </div>
                )
            }
        </div>
    );
}

Games.defaultProps = {
    entities: [
        { Id: 1, Name: 'Quake', Rating: '9.0', Type: 'FPS' },
        { Id: 2, Name: 'COD', Rating: '9.5', Type: 'FPS' },
        { Id: 3, Name: 'Mario Kart', Rating: '8.0', Type: 'Racing' },
        { Id: 4, Name: 'Grim Fandango', Rating: '10.0', Type: 'Adventure' }
    ],
};

export default Games;