
import {combineReducers} from 'redux';

import users from '../users';
import * as actionTypes from './actionTypes';

const initialState = {
    getLastInscriptionId: null,
};


const getLastInscriptionId = (state = initialState.getLastInscriptionId, action) => {

    switch (action.type) {

        case actionTypes.INSCRIPTION_COMPLETED:
            return action.getLastInscriptionId;//en PA-Shop esto sería registrationId pero creo que es una errata porque no sale de ninguna parte

        default:
            return state;

    }

}