const getModuleState = state => state.search;

export const getSportingEventSearch = state =>
    getModuleState(state).sportingEventSearch;

export const getSportingEventType = state =>
    getModuleState(state).sportingEventsTypes;

export const getSportingEventTypeName = (sportingEventTypes, id) => {

    if (!sportingEventTypes) {
        return '';
    }

    const sportingEventType = sportingEventTypes.find(sportingEventType => sportingEventType.id === id);

    if (!sportingEventTypes) {
        return '';
    }

    return sportingEventType.name;

}

export const getProvince = state =>
    getModuleState(state).provinces;

export const getProvinceName = (provinces, id) => {

    if (!provinces) {
        return '';
    }

    const province = provinces.find(province => province.id === id);

    if (!provinces) {
        return '';
    }

    return province.name;

}