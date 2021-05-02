const getModuleState = state => state.eventSearch;

export const getSportingEventTypes = state =>
    getModuleState(state).sportingEventTypes;

export const getSportingEventTypeName = (sportingEventTypes, id) => {

    if (!sportingEventTypes) {
        return '';
    }

    const sportingEventType = sportingEventTypes.find(sportingEventType => sportingEventType.id === id);

    if (!sportingEventType) {
        return '';
    }

    return sportingEventType.name;

}

export const getProvinces = state =>
    getModuleState(state).provinces;

export const getProvinceName = (provinces, id) => {

    if (!provinces) {
        return '';
    }

    const province = provinces.find(province => province.id === id);

    if (!province) {
        return '';
    }

    return province.name;

}

export const getSportingEventSearch = state =>
    getModuleState(state).sportingEventSearch;

export const getSportingEvent = state =>
    getModuleState(state).sportingEvent;