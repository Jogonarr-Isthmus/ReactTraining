import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './app';
import auth from './auth';
import entities from './entities';

export default (history) => combineReducers({
    router: connectRouter(history),
    app,
    auth,
    entities
});