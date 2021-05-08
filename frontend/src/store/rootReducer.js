import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import eventSearch from '../modules/eventsearch';
import registrations from '../modules/registrations';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    eventSearch: eventSearch.reducer,
    registrations: registrations.reducer
});

export default rootReducer;
