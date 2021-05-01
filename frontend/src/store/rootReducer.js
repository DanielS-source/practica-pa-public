import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import eventSearch from '../modules/eventsearch';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    eventSearch: eventSearch.reducer
});

export default rootReducer;
