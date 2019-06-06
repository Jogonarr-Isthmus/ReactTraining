import React, { useState } from 'react';
import './Maintenance.css';

import List from '../List/List.js';
import UserForm from '../Forms/UserForm.js';
import GameForm from '../Forms/GameForm.js';

function Maintenance(props) {
    const [entities, setEntities] = useState(props.entities);
    const [formIsActive, setFormIsActive] = useState(false);
    const [formEntity, setFormEntity] = useState({});

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [' + props.entityName + 's].');
        console.log('[' + props.entityName + 's]: ', entities);

        let newId = 1;
        if (entities && entities.length > 0) {
            const entityIds = entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        setEntities(updatedEntities);

        console.log('[' + props.entityName + 's]: ', entities);
    };

    const loadEditForm = (entity, index) => {
        setFormIsActive(true);
        setFormEntity({ ...entity, Index: index });
    };

    const editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [' + props.entityName + 's].');
        console.log('[' + props.entityName + 's]: ', entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...entities];
        updatedEntities[index] = entityToUpdate;

        setEntities(updatedEntities);

        console.log('[' + props.entityName + 's]: ', entities);
    };

    const deleteEntity = (id) => {
        console.log('Delete Entity from [' + props.entityName + 's].');
        console.log('[' + props.entityName + 's]: ', entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...entities].filter(entity => entity.Id !== id);

            setEntities(updatedEntities);
        }

        console.log('[' + props.entityName + 's]: ', entities);
    };

    const onFormClose = () => {
        setFormEntity({});
        setFormIsActive(false);
    };

    const getEntityForm = () => {
        let entityForm = '';

        switch (props.entityName) {
            case 'User':
                entityForm = <UserForm entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />;
                break;
            case 'Game':
                entityForm = <GameForm entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />;
                break;
            default:
                entityForm = <div></div>;
        }

        return entityForm;
    };

    return (
        <div className="Maintenance">
            <h3>{props.entityName}s <small>Func</small></h3>
            {formIsActive
                ? getEntityForm()
                : (
                    <div>
                        <div className="MaintenanceHeader">
                            <button className="btn btn-sm btn-success" onClick={() => setFormIsActive(true)}>+ New {props.entityName}</button>
                        </div>
                        <List entities={entities} onEdit={loadEditForm} onDelete={deleteEntity} />
                    </div>
                )
            }
        </div>
    );
}

export default Maintenance;