import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    lastInscriptionId: null
};

const getLastInscriptionId = (state = initialState.lastInscriptionId, action) => {

    switch (action.type) {

        case actionTypes.INSCRIPTION_COMPLETED:
            return action.lastInscriptionId;

        default:
            return state;

    }

}

const reducer = combineReducers({
    getLastInscriptionId
});

export default reducer;