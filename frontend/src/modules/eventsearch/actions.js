import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import backend from '../../backend';

export const findSportingEvents = criteria => dispatch => {

    dispatch(clearSportingEventSearch());
    backend.infoSearchService.findSportTests(criteria,
        result => dispatch(findProductsCompleted({criteria, result})));

}

const clearSportingEventSearch = () => ({
    type: actionTypes.CLEAR_SPORTING_EVENTS_SEARCH
});