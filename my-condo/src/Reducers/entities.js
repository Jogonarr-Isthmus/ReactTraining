const initialState = {
    errorMessage: '',
    default: [],
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
            House: 'N15',
            Amenity: 'Casa Club',
            Reservation: 'Salon de Eventos',
            Date: '12/06/2019'
        },
        {
            Id: 2,
            House: 'M01',
            Amenity: 'Area Recreativa Vistas del Coyol',
            Reservation: 'Rancho 1',
            Date: '08/16/2019'
        }
    ]
};

export default (state = initialState, action) => {
    let entities = state[action.entityName];
    let errorMessage = '';

    switch (action.type) {
        case 'insert':
            let newId = 1;
            if (entities && entities.length > 0) {
                const entityIds = entities.map(entity => entity.Id);
                newId = Math.max(...entityIds) + 1;
            }

            entities.push({ Id: newId, ...action.record });
            break;

        case 'edit':
            if (action.record) {
                const index = entities.findIndex(entity => entity.Id === action.record.Id);
                entities[index] = action.record;
            } else {
                errorMessage = `Record with Id = [${action.record.Id}] not found.`;
            }
            break;

        case 'remove':
            if (action.id) {
                entities = entities.filter(entity => entity.Id !== action.id);
            } else {
                errorMessage = `Record with Id = [${action.id}] not found.`;
            }
            break;

        default:
            return state;
    }

    return {
        ...state,
        errorMessage: errorMessage,
        [action.entityName]: entities
    }
};

export const insert = (entityName, record) => {
    return dispatch => {
        dispatch({
            type: 'insert',
            entityName,
            record
        });
    };
};

export const edit = (entityName, record) => {
    return dispatch => {
        dispatch({
            type: 'edit',
            entityName,
            record
        });
    };
};

export const remove = (entityName, id) => {
    return dispatch => {
        dispatch({
            type: 'remove',
            entityName,
            id
        });
    };
};