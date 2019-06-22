import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createHashHistory as createHistory } from 'history';
import rootReducer from './Reducers';

export const history = createHistory();

const initialState = {};
const middleware = [
    thunk,
    routerMiddleware(history)
];

const composedEnhancers = compose(
    applyMiddleware(...middleware)
);

const store = createStore(
    rootReducer(history),
    initialState,
    composedEnhancers
);

export default store;