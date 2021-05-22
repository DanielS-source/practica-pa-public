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


const clearRegistrationSearch = () => ({
    type: actionTypes.CLEAR_REGISTRATION_SEARCH
});

const findRegistrationsCompleted = registrationSearch => ({
    type: actionTypes.FIND_REGISTRATION_COMPLETED,
    registrationSearch
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

export const rateRegistration = (InscriptionId, score, onSuccess, onErrors) => dispatch => {
    backend.registrationService.scoreSportingEvent(InscriptionId, score, onSuccess, onErrors);
    dispatch(rateRegistrationCompleted(InscriptionId, score))
}

export const rateRegistrationCompleted = (id, score) => ({
    type: actionTypes.RATE_REGISTRATION_COMPLETED,
    id,
    score
})