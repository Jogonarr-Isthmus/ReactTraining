const initialState = {
    errorMessage: '',
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
    games: [
        { Id: 1, Name: 'Quake', Rating: '9.0', Type: 'FPS' },
        { Id: 2, Name: 'COD', Rating: '9.5', Type: 'FPS' },
        { Id: 3, Name: 'Mario Kart', Rating: '8.0', Type: 'Racing' },
        { Id: 4, Name: 'Grim Fandango', Rating: '10.0', Type: 'Adventure' }
    ],
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