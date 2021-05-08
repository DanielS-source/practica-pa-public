const getModuleState = state => state.registrations;

export const getInscription = state =>
    getModuleState(state).inscription;