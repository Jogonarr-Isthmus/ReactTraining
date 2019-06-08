import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import counter from './counter';
import entities from './entities';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    counter,
    entities
});