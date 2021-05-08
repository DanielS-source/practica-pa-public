import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import eventSearch from '../modules/eventsearch';
import registration from '../modules/registration';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    eventSearch: eventSearch.reducer,
    registration: registration.reducer
});

export default rootReducer;
