import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import backend from '../../backend';

export const findSportingEvents = criteria => dispatch => {

    dispatch(clearSportingEventSearch());
    backend.searchService.findSportingEvents(criteria,
        result => dispatch(findSportingEventsCompleted({criteria, result})));

}

const clearSportingEventSearch = () => ({
    type: actionTypes.CLEAR_SPORTING_EVENTS_SEARCH
});

const findSportingEventsCompleted = sportingEventSearch => ({
    type: actionTypes.FIND_SPORTING_EVENTS_COMPLETED,
    sportingEventSearch
});