import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    inscription: null
};

const getInscription = (state = initialState.inscription, action) => {

    switch (action.type) {

        case actionTypes.INSCRIPTION_COMPLETED:
            return action.inscription;

        default:
            return state;

    }

}

const reducer = combineReducers({
    getInscription
});

export default reducer;