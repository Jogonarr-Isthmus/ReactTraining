import React, { useState } from 'react';
import './Maintenance.css';

import List from './List/List.js';
import Form from './Forms/AmenitiesForm';

function Amenities(props) {
    const [entities, setEntities] = useState(props.entities);
    const [formIsActive, setFormIsActive] = useState(false);
    const [formEntity, setFormEntity] = useState({});

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [Amenities].');
        console.log('[Amenities]: ', entities);

        let newId = 1;
        if (entities && entities.length > 0) {
            const entityIds = entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        setEntities(updatedEntities);

        console.log('[Amenities]: ', entities);
    };

    const loadEditForm = (entity, index) => {
        console.log('entity: ', entity);

        setFormIsActive(true);
        setFormEntity({ ...entity, Index: index });
    };

    const editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [Amenities].');
        console.log('[Amenities]: ', entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...entities];
        updatedEntities[index] = entityToUpdate;

        setEntities(updatedEntities);

        console.log('[Amenities]: ', entities);
    };

    const deleteEntity = (id) => {
        console.log('Delete Entity from [Amenities].');
        console.log('[Amenities]: ', entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...entities].filter(entity => entity.Id !== id);

            setEntities(updatedEntities);
        }

        console.log('[Amenities]: ', entities);
    };

    const onFormClose = () => {
        setFormEntity({});
        setFormIsActive(false);
    };

    return (
        <div className="Maintenance">
            <h3>Amenities <small>Maintenance</small></h3>
            {formIsActive
                ? <Form entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />
                : (
                    <div>
                        <div className="MaintenanceHeader">
                            <button className="btn btn-sm btn-success" onClick={() => setFormIsActive(true)}>+ New Amenitie</button>
                        </div>
                        <List entities={entities} onEdit={loadEditForm} onDelete={deleteEntity}></List>
                    </div>
                )
            }
        </div>
    );
}

Amenities.defaultProps = {
    entities: [
        {
            Id: 1,
            Name: 'Area Recreativa La Garita',
            Description: 'Zona al aire libre con 3 ranchos, 12 parrillas, 1 picina para adultos 1 picina para niños, baños.'
        },
        {
            Id: 2,
            Name: 'Area Recreativa El Cacao',
            Description: 'Zona al aire libre con 3 ranchos, 12 parrillas, 1 picina para adultos 1 picina para niños, baños.'
        },
        {
            Id: 3,
            Name: 'Area Recreativa Los Higuerones',
            Description: 'Zona al aire libre con 3 ranchos, 12 parrillas, 1 picina para adultos 1 picina para niños, baños.'
        },
        {
            Id: 4,
            Name: 'Area Recreativa Vistas del Coyol',
            Description: 'Zona al aire libre con 3 ranchos, 12 parrillas, 1 picina para adultos 1 picina para niños, baños.'
        },
        {
            Id: 5,
            Name: 'Casa Club',
            Description: 'Area cerrada para fiestas/reuniones, capacidad para 100 personas, gimnacio en el segundo piso.'
        }
    ],
};

export default Amenities;