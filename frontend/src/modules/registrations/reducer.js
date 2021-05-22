import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    inscription: null,
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

const registrationSearch = (state = initialState.registrationSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_REGISTRATION_COMPLETED:
            return action.registrationSearch;

        case actionTypes.RATE_REGISTRATION_COMPLETED:
            return {registrations : action.registrationSearch.map(registration => {
                console.log(registration);
                return registration.id === action.id ? registration.score = action.score : registration})};

        case actionTypes.CLEAR_REGISTRATION_SEARCH:
            return initialState.registrationSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    inscription,
    registrationSearch
});

export default reducer;