const getModuleState = state => state.search;

export const getSportingEventSearch = state =>
    getModuleState(state).sportingEventSearch;

export const getSportingEventTypes = state =>
    getModuleState(state).sportingEventsTypes;

export const getSportingEventTypeNames = (sportingEventTypes, id) => {

    if (!sportingEventTypes) {
        return '';
    }

    const sportingEventType = sportingEventTypes.find(sportingEventType => sportingEventType.id === id);

    if (!sportingEventTypes) {
        return '';
    }

    return sportingEventType.name;

}

export const getProvinces = state =>
    getModuleState(state).provinces;

export const getProvinceNames = (provinces, id) => {

    if (!provinces) {
        return '';
    }

    const province = provinces.find(province => province.id === id);

    if (!provinces) {
        return '';
    }

    return province.name;

}