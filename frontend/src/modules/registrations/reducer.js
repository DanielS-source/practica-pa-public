import {combineReducers} from 'redux';

import users from '../users';
import * as actionTypes from './actionTypes';

const initialState = {
    sportingEvent: null,
    lastInscriptionId: null
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

const getLastInscriptionId = (state = initialState.lastInscriptionId, action) => {

    switch (action.type) {

        case actionTypes.INSCRIPTION_COMPLETED:
            return action.lastInscriptionId;

        default:
            return state;

    }

}

const reducer = combineReducers({
    sportingEvent,
    getLastInscriptionId
});

export default reducer;