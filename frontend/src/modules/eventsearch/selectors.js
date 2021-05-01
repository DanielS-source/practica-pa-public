const getModuleState = state => state.search;

export const getSportingEventSearch = state =>
    getModuleState(state).sportingEventSearch;

export const getSportingEventTypes = state =>
    getModuleState(state).sportingEventSearch;

export const getProvinces = state =>
    getModuleState(state).sportingEventSearch;