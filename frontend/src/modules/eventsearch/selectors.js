const getModuleState = state => state.search;

export const getSportingEventSearch = state =>
    getModuleState(state).search;

export const getSportingEvent = state =>
    getModuleState(state).