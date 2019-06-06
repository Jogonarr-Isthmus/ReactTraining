import React, { useState } from 'react';
import './Maintenance.css';

import List from './List/List.js';
import Form from './Forms/ReservationForm';

function Reservations(props) {
    const [entities, setEntities] = useState(props.entities);
    const [formIsActive, setFormIsActive] = useState(false);
    const [formEntity, setFormEntity] = useState({});

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [Reservations].');
        console.log('[Reservations]: ', entities);

        let newId = 1;
        if (entities && entities.length > 0) {
            const entityIds = entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        setEntities(updatedEntities);

        console.log('[Reservations]: ', entities);
    };

    const loadEditForm = (entity, index) => {
        console.log('entity: ', entity);

        setFormIsActive(true);
        setFormEntity({ ...entity, Index: index });
    };

    const editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [Reservations].');
        console.log('[Reservations]: ', entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...entities];
        updatedEntities[index] = entityToUpdate;

        setEntities(updatedEntities);

        console.log('[Reservations]: ', entities);
    };

    const deleteEntity = (id) => {
        console.log('Delete Entity from [Reservations].');
        console.log('[Reservations]: ', entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...entities].filter(entity => entity.Id !== id);

            setEntities(updatedEntities);
        }

        console.log('[Reservations]: ', entities);
    };

    const onFormClose = () => {
        setFormEntity({});
        setFormIsActive(false);
    };

    return (
        <div className="Maintenance">
            <h3>Reservations <small>Maintenance</small></h3>
            {formIsActive
                ? <Form entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />
                : (
                    <div>
                        <div className="MaintenanceHeader">
                            <button className="btn btn-sm btn-success" onClick={() => setFormIsActive(true)}>+ New Reservation</button>
                        </div>
                        <List entities={entities} onEdit={loadEditForm} onDelete={deleteEntity}></List>
                    </div>
                )
            }
        </div>
    );
}

Reservations.defaultProps = {
    entities: [
        {
            Id: 1,
            Estate: 'N15',
            Amenitie: 'Casa Club',
            Reservation: 'Salon de Eventos',
            Date: '12/06/2019'
        },
        {
            Id: 2,
            Estate: 'M01',
            Amenitie: 'Area Recreativa Vistas del Coyol',
            Reservation: 'Rancho 1',
            Date: '08/16/2019'
        }
    ],
};

export default Reservations;