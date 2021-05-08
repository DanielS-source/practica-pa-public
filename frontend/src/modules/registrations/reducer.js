
import {combineReducers} from 'redux';

import users from '../users';
import * as actionTypes from './actionTypes';

const initialState = {
    sportingEvent: null,
    getLastInscriptionId: null
};

const sportingEvent = (state = initialState.sportingEvent, action) => {

    switch (action.type) {

        case users.actionTypes.LOGIN_COMPLETED:
            return action.authenticatedUser.sportingEvent;

        case users.actionTypes.SIGN_UP_COMPLETED:
            return action.authenticatedUser.sportingEvent;

        case actionTypes.INSCRIPTION_COMPLETED:
            return {id: state.id};

        default:
            return state;

    }

}

const getLastInscriptionId = (state = initialState.getLastInscriptionId, action) => {

    switch (action.type) {

        case actionTypes.INSCRIPTION_COMPLETED:
            return action.getLastInscriptionId;
            //en PA-Shop esto sería registrationId pero creo que es una errata porque no sale de ninguna parte

        default:
            return state;

    }

}

const reducer = combineReducers({
    sportingEvent,
    lastInscriptionId
});

export default reducer;