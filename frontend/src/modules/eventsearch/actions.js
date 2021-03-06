import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import backend from '../../backend';





export const findSportingEventsCompleted = sportingEventSearch => ({
    type: actionTypes.FIND_SPORTING_EVENTS_COMPLETED,
    sportingEventSearch
});

export const findSportingEvents = criteria => dispatch => {

    dispatch(clearSportingEventSearch());
    backend.searchService.findSportingEvents(criteria,
        result => dispatch(findSportingEventsCompleted({criteria, result})));

}

export const clearSportingEventSearch = () => ({
    type: actionTypes.CLEAR_SPORTING_EVENTS_SEARCH
});

export const previousFindProductsResultPage = criteria =>
    findSportingEvents({...criteria, page: criteria.page-1});

export const nextFindProductsResultPage = criteria =>
    findSportingEvents({...criteria, page: criteria.page+1});

const findSportingEventsByIdCompleted = sportingEvent => ({
    type: actionTypes.FIND_SPORTING_EVENT_BY_ID_COMPLETED,
    sportingEvent
})

export const findSportingEventsById = id => dispatch => {
    backend.searchService.findBySportingEventId(id,
        sportingEvent => dispatch(findSportingEventsByIdCompleted(sportingEvent)));
}

export const clearSportingEvent = () => ({
    type: actionTypes.CLEAR_SPORTING_EVENT
})


const findAllProvincesCompleted = provinces => ({
    type: actionTypes.FIND_ALL_PROVINCES_COMPLETED,
    provinces
})

export const findAllProvinces = () => (dispatch, getState) => {
    const provinces = selectors.getProvinces(getState());

    if (!provinces){
        backend.searchService.findAllProvinces(
            provinces => dispatch(findAllProvincesCompleted(provinces))
        )
    }
}

const findAllSportingEventTypesCompleted = sportingEventTypes => ({
    type: actionTypes.FIND_ALL_SPORTING_EVENT_TYPES_COMPLETED,
    sportingEventTypes
})

export const findAllSportingEventTypes = () => (dispatch, getState) => {
    const sportingEventTypes = selectors.getSportingEventTypes(getState());

    if (!sportingEventTypes){
        backend.searchService.findAllSportingEventTypes(
            sportingEventTypes => dispatch(findAllSportingEventTypesCompleted(sportingEventTypes))
        )
    }
}

