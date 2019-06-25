const initialState = {
    version: '2.0',
    baseApiUrl: 'http://kyrapps.com:4300/api/'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'updateVersion':
            return {
                ...state,
                version: action.version
            };

        default:
            return state;
    }
};

export const updateVersion = (version) => {
    return dispatch => {
        dispatch({
            version: version
        });
    };
};