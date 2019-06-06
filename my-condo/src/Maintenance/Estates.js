import React, { useState } from 'react';
import './Maintenance.css';

import List from './List/List.js';
import Form from './Forms/EstateForm';

function Estates(props) {
    const [entities, setEntities] = useState(props.entities);
    const [formIsActive, setFormIsActive] = useState(false);
    const [formEntity, setFormEntity] = useState({});

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [Estates].');
        console.log('[Estates]: ', entities);

        let newId = 1;
        if (entities && entities.length > 0) {
            const entityIds = entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        setEntities(updatedEntities);

        console.log('[Estates]: ', entities);
    };

    const loadEditForm = (entity, index) => {
        console.log('entity: ', entity);

        setFormIsActive(true);
        setFormEntity({ ...entity, Index: index });
    };

    const editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [Estates].');
        console.log('[Estates]: ', entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...entities];
        updatedEntities[index] = entityToUpdate;

        setEntities(updatedEntities);

        console.log('[Estates]: ', entities);
    };

    const deleteEntity = (id) => {
        console.log('Delete Entity from [Estates].');
        console.log('[Estates]: ', entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...entities].filter(entity => entity.Id !== id);

            setEntities(updatedEntities);
        }

        console.log('[Estates]: ', entities);
    };

    const onFormClose = () => {
        setFormEntity({});
        setFormIsActive(false);
    };

    return (
        <div className="Maintenance">
            <h3>Estates <small>Maintenance</small></h3>
            {formIsActive
                ? <Form entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />
                : (
                    <div>
                        <div className="MaintenanceHeader">
                            <button className="btn btn-sm btn-success" onClick={() => setFormIsActive(true)}>+ New Estate</button>
                        </div>
                        <List entities={entities} onEdit={loadEditForm} onDelete={deleteEntity}></List>
                    </div>
                )
            }
        </div>
    );
}

Estates.defaultProps = {
    entities: [
        {
            Id: 1,
            Code: 'N15',
            Area: '160',
            OwnerName: 'Pablo',
            OwnerPhone: '83411578',
            OwnerEmail: 'pgonzalez@isthmusit.com'
        }
    ],
};

export default Estates;