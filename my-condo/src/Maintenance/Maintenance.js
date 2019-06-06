import React, { useState, useEffect } from 'react';
import './Maintenance.css';

import List from './List/List.js';
import UserForm from './Forms/UserForm';
import EstateForm from './Forms/EstateForm';
import AmenitiesForm from './Forms/AmenitiesForm';
import ReservationForm from './Forms/ReservationForm';

function Maintenance(props) {
    const [currrentEntity, setCurrrentEntity] = useState(props.entityName);
    const [entities, setEntities] = useState([]);
    const [formIsActive, setFormIsActive] = useState(false);
    const [formEntity, setFormEntity] = useState({});
    const [formHtml, setFormHtml] = useState(<div>Form not defined for {currrentEntity}s</div>);

    const insertEntity = (newEntity) => {
        console.log('Insert new Entity to [' + currrentEntity + 's].');
        console.log('[' + currrentEntity + 's]: ', entities);

        let newId = 1;
        if (entities && entities.length > 0) {
            const entityIds = entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        setEntities(updatedEntities);

        console.log('[' + currrentEntity + 's]: ', entities);
    };

    const loadEditForm = (entity, index) => {
        console.log('entity: ', entity);

        setFormIsActive(true);
        setFormEntity({ ...entity, Index: index });
    };

    const editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [' + currrentEntity + 's].');
        console.log('[' + currrentEntity + 's]: ', entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...entities];
        updatedEntities[index] = entityToUpdate;

        setEntities(updatedEntities);

        console.log('[' + currrentEntity + 's]: ', entities);
    };

    const deleteEntity = (id) => {
        console.log('Delete Entity from [' + currrentEntity + 's].');
        console.log('[' + currrentEntity + 's]: ', entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...entities].filter(entity => entity.Id !== id);

            setEntities(updatedEntities);
        }

        console.log('[' + currrentEntity + 's]: ', entities);
    };

    const onFormClose = () => {
        setFormEntity({});
        setFormIsActive(false);
    };

    const setMaintenanceValues = () => {
        console.log('currrentEntity: ', currrentEntity);

        switch (currrentEntity) {
            case 'User':
                setEntities(props.defaultEntities.users);
                setFormHtml(<UserForm entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />);
                break;
            case 'Estate':
                setEntities(props.defaultEntities.estates);
                setFormHtml(<EstateForm entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />);
                break;
            case 'Amenities':
                setEntities(props.defaultEntities.amenities);
                setFormHtml(<AmenitiesForm entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />);
                break;
            case 'Reservation':
                setEntities(props.defaultEntities.reservations);
                setFormHtml(<ReservationForm entity={formEntity} onInsert={insertEntity} onEdit={editEntity} onClose={onFormClose} />);
                break;
            default:
                setEntities([]);
                setFormHtml(<div>Form not defined for {currrentEntity}s</div>);
                break;
        }

        console.log('[' + currrentEntity + 's]: ', entities);
    };
    setMaintenanceValues();

    // If props changes then apply the Effect (refresh the entities value with the correct array)
    useEffect(() => {
        if (props.entityName !== currrentEntity) {
            setMaintenanceValues();
        }
    });

    return (
        <div className="Maintenance">
            <h3>{currrentEntity}s <small>Maintenance</small></h3>
            {formIsActive
                ? formHtml
                : (
                    <div>
                        <div className="MaintenanceHeader">
                            <button className="btn btn-sm btn-success" onClick={() => setFormIsActive(true)}>+ New {currrentEntity}</button>
                        </div>
                        <List entities={entities} onEdit={loadEditForm} onDelete={deleteEntity}></List>
                    </div>
                )
            }
        </div>
    );
}

Maintenance.defaultProps = {
    defaultEntities: {
        users: [
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
        estates: [
            {
                Id: 1,
                Code: 'N15',
                Area: '160',
                OwnerName: 'Pablo',
                OwnerPhone: '83411578',
                OwnerEmail: 'pgonzalez@isthmusit.com'
            }
        ],
        amenities: [
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
        reservations: [
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
                Date: '16/08/2019'
            }
        ]
    }
};

export default Maintenance;