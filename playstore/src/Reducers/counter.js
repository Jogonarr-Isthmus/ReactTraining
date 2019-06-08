const initialState = {
    counter: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'increment':
            return { counter: state.counter + action.increment };

        default:
            return state;
    }
};

export const increment = (value) => {
    return dispatch => {
        dispatch({
            type: 'increment',
            increment: value
        });
    };
};