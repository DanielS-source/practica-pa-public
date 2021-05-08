const getModuleState = state => state.registration;

export const getLastRegistrationId = state =>
    getModuleState(state).getLastInscriptionId;