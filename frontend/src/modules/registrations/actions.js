import backend from '../../backend';
import * as actionTypes from './actionTypes';

const inscriptionCompleted = (inscription) => ({
    type: actionTypes.INSCRIPTION_COMPLETED,
    inscription
});

export const inscribe = (sportingEventId, creditCard, onSuccess,
    onErrors) => dispatch =>
    backend.registrationService.createRegistration(sportingEventId, creditCard, inscription => {
        dispatch(inscriptionCompleted(inscription));
        onSuccess();
    },
    onErrors);