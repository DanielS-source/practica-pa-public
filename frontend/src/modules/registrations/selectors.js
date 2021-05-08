const getModuleState = state => state.registrations;

export const getLastInscriptionId = state =>
    getModuleState(state).getLastInscriptionId;

export const getSportingEvent = state =>
    getModuleState(state).getSportingEvent;