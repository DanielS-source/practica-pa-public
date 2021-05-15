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

export const deliverDorsal = (inscriptionId, sportingEventId, creditCard, onSuccess,
                         onErrors) => dispatch =>
    backend.registrationService.deliverDorsal(inscriptionId, sportingEventId, creditCard, ({dorsal}) => {
            onSuccess(dorsal);
        },
        onErrors);

const clearRegistrationSearch = () => ({
    type: actionTypes.CLEAR_REGISTRATION_SEARCH
});

export const findRegistrations = criteria => dispatch => {

    dispatch(clearRegistrationSearch());
    backend.registrationService.findRegistrations(criteria,
        result => dispatch(findRegistrationsCompleted({criteria, result})));

}

export const previousFindRegistrationsResultPage = criteria =>
    findRegistrations({page: criteria.page-1});

export const nextFindRegistrationsResultPage = criteria =>
    findRegistrations({page: criteria.page+1});

const findRegistrationsCompleted = registration => ({
    type: actionTypes.FIND_REGISTRATION_COMPLETED,
    registration
});

export const rateRegistration = (InscriptionId, score, onSuccess, onErrors) => {
    backend.registrationService.scoreSportingEvent(InscriptionId, score, onSuccess, onErrors)
}