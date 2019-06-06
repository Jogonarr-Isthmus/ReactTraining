import React, { useState } from 'react';
import './Maintenance.css';

import List from './List/List.js';
import Form from './Forms/UserForm';

function Users(props) {
    const [entities, setEntities] = useState(props.entities);
    const [formIsActive, setFormIsActive] = useState(false);
    const [formEntity, setFormEntity] = useState({});

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [Users].');
        console.log('[Users]: ', entities);

        let newId = 1;
        if (entities && entities.length > 0) {
            const entityIds = entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        setEntities(updatedEntities);

        console.log('[Users]: ', entities);
    };

    const loadEditForm = (entity, index) => {
        console.log('entity: ', entity);

        setFormIsActive(true);
        setFormEntity({ ...entity, Index: index });
    };

    const editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [Users].');
        console.log('[Users]: ', entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...entities];
        updatedEntities[index] = entityToUpdate;

        setEntities(updatedEntities);

        console.log('[Users]: ', entities);
    };

    const deleteEntity = (id) => {
        console.log('Delete Entity from [Users].');
        console.log('[Users]: ', entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...entities].filter(entity => entity.Id !== id);

            setEntities(updatedEntities);
        }

        console.log('[Users]: ', entities);
    };

    const onFormClose = () => {
        setFormEntity({});
        setFormIsActive(false);
    };

    return (
        <div className="Maintenance">
            <h3>Users <small>Maintenance</small></h3>
            {formIsActive
                ? <Form entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />
                : (
                    <div>
                        <div className="MaintenanceHeader">
                            <button className="btn btn-sm btn-success" onClick={() => setFormIsActive(true)}>+ New User</button>
                        </div>
                        <List entities={entities} onEdit={loadEditForm} onDelete={deleteEntity}></List>
                    </div>
                )
            }
        </div>
    );
}

Users.defaultProps = {
    entities: [
        {
            Id: 1,
            Name: 'Jose Pablo',
            LastName: 'Gonzalez Arrieta',
            Email: 'pgonzalez@isthmusit.com',
            Phone: '83411578',
            Username: 'pablo',
            Password: 'p@bl0'
        }
    ],
};

export default Users;