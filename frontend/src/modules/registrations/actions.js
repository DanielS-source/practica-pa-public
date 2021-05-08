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

export const dorsalDelivered = (dorsal) => ({
    type: actionTypes.DORSAL_DELIVERED,
    dorsal
})

export const deliverDorsal = (inscriptionId, sportingEventId, creditCard, onSuccess,
                         onErrors) => dispatch =>
    backend.registrationService.deliverDorsal(inscriptionId, sportingEventId, creditCard, ({dorsal}) => {
            dispatch(dorsalDelivered(dorsal));
            onSuccess();
        },
        onErrors);