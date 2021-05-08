const getModuleState = state => state.registrations;

export const getLastInscriptionId = state =>
    getModuleState(state).lastInscriptionId;