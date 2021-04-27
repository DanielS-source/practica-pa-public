import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    search: null
};

const search = (state = initialState.search, action) => {

    switch (action.type) {

        case actionTypes.FIND_SPORTING_EVENTS_COMPLETED:
            return action.search;

        case actionTypes.CLEAR_SPORTING_EVENTS_SEARCH:
            return initialState.search;

        default:
            return state;

    }

}

const reducer = combineReducers({
    search
});

export default reducer;