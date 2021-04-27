import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    sportingEventSearch: null
};

const sportingEventSearch = (state = initialState.sportingEventSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_SPORTING_EVENTS_COMPLETED:
            return action.sportingEventSearch;

        case actionTypes.CLEAR_SPORTING_EVENTS_SEARCH:
            return initialState.sportingEventSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    sportingEventSearch
});

export default reducer;