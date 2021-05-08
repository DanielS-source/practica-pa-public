import backend from '../../backend';
import * as actionTypes from './actionTypes';

const inscriptionCompleted = (inscriptionId) => ({
    type: actionTypes.INSCRIPTION_COMPLETED,
    inscriptionId
});

export const inscribe = (sportingEventId, creditCard, onSuccess,
    onErrors) => dispatch =>
    backend.registrationService.createRegistration(sportingEventId, creditCard, ({id}) => {
        dispatch(inscriptionCompleted(id));
        onSuccess();
    },
    onErrors);