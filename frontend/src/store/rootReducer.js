import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import users from '../modules/eventsearch';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    search: eventsearh.reducer
});

export default rootReducer;
