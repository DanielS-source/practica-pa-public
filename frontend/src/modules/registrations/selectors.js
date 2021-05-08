const getModuleState = state => state.registrations;

export const getLastRegistrationId = state =>
    getModuleState(state).getLastInscriptionId;

export const getSportingEvent = state =>
    getModuleState(state).getSportingEvent;