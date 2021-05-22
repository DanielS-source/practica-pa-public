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

export const rateRegistration = (registration, onSuccess, onErrors) => dispatch => {
    backend.registrationService.scoreSportingEvent(registration.id, registration.score, onSuccess, onErrors);
    dispatch(rateRegistrationCompleted(registration))
}

export const rateRegistrationCompleted = (registration) => ({
    type: actionTypes.RATE_REGISTRATION_COMPLETED,
    registration
})