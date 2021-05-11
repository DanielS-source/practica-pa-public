import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    inscription: null,
    dorsal: null
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

const reducer = combineReducers({
    inscription,
    dorsal
});

export default reducer;