import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    sportingEventSearch: null,
    provinces: null,
    sportingEventsTypes: null,
};

const provinces = (state = initialState.provinces, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_PROVINCES_COMPLETED:
            return action.provinces;

        default:
            return state;

    }

}

const sportingEventsTypes = (state = initialState.sportingEventsTypes, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_SPORTING_EVENTS_TYPES_COMPLETED:
            return action.sportingEventsTypes;

        default:
            return state;

    }

}

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
    sportingEventSearch,
    provinces,
    sportingEventsTypes
});

export default reducer;