const getModuleState = state => state.registrations;

export const getLastRegistrationId = state =>
    getModuleState(state).getLastInscriptionId;