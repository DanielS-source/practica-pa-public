const getModuleState = state => state.registrations;

export const getInscription = state =>
    getModuleState(state).inscription;

export const getDorsal = state =>
    getModuleState(state).dorsal;