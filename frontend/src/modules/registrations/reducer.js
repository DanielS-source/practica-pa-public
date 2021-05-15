import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    inscription: null,
    dorsal: null,
    registrationSearch: null
};

const inscription = (state = initialState.inscription, action) => {

    switch (action.type) {

        case actionTypes.INSCRIPTION_COMPLETED:
            return action.inscription;

        default:
            return state;

    }

}

const dorsal = (state = initialState.dorsal, action) => {

    switch (action.type) {

        case actionTypes.DORSAL_DELIVERED:
            return action.dorsal;

        default:
            return state;

    }

}

const registrationSearch = (state = initialState.registrationSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_REGISTRATION_COMPLETED:
            return action.registrationSearch;

        case actionTypes.CLEAR_REGISTRATION_SEARCH:
            return initialState.registrationSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    inscription,
    dorsal,
    registrationSearch
});

export default reducer;