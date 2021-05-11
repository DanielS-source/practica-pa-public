import {config, appFetch} from './appFetch';

export const createRegistration = (sportTestId, creditCard, onSuccess, onErrors) =>
    appFetch(`/inscriptions/inscribe`,
        config('POST', {sportTestId, creditCard}), onSuccess, onErrors);

export const deliverDorsal = (inscriptionId, sportTestId, creditCard, onSuccess, onErrors) =>
    appFetch(`/inscriptions/dorsal/${inscriptionId}`,
        config('POST', {sportTestId, creditCard}), onSuccess, onErrors)

export const findRegistrations = ({page}, onSuccess) =>
    appFetch(`/inscriptions/retrieve?page=${page}`,
        config('GET', {}), onSuccess)

export const scoreSportingEvent = (inscriptionId, score, onSuccess, onErrors) =>
    appFetch(`/inscriptions/${inscriptionId}/score`,
        config('POST', {score}), onSuccess, onErrors)