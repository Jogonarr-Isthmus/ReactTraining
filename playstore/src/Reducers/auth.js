const initialState = {
    isLogged: false,
    logginError: '',
    loggedUser: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'logIn':
            return {
                ...state,
                isLogged: true,
                loggedUser: action.user,
                logginError: ''
            };

        case 'logInError':
            return {
                ...state,
                logginError: action.error
            };

        case 'logOut':
            return initialState;

        default:
            return state;
    }
};

export const logOut = () => {
    return dispatch => {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('val');

        dispatch({
            type: 'logOut'
        });
    };
};

export const logInError = () => {
    return dispatch => {
        dispatch({
            type: 'logInError',
            error: 'Hay un problema en su info'
        });
    };
};

export const logInSuccess = (user) => {
    return dispatch => {
        localStorage.setItem('isLogged', true);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
            type: 'logIn',
            user: user
        });
    };
};