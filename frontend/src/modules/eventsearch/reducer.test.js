import reducer from './reducer';
import * as actions from './actions';

test('FIND_SPORTING_EVENTS_COMPLETED', () => {

    const criteria = {
        provinceId: 1,
        sportTestTypeId: 1,
        startDate: '2020-05-12',
        endDate: '2023-05-12',
        page: 0};

    const result = {
        items: [],
        existsMoreItems: false,
    };

    const sportingEventSearch = {criteria, result};

    const initialState = {sportingEventSearch: null};

    const state = reducer(initialState, actions.findSportingEventsCompleted(sportingEventSearch));

    expect(state.sportingEventSearch).toEqual(
        sportingEventSearch
    );

})

test('CLEAR_SPORTING_EVENTS_SEARCH', () => {

    const criteria = {
        provinceId: 1,
        sportTestTypeId: 1,
        startDate: '2020-05-12',
        endDate: '2023-05-12',
        page: 0};

    const result = {
        items: [],
        existsMoreItems: false,
    };

    const sportingEventSearch = {criteria, result};

    const expectedState = null;

    const initialState = {sportingEventSearch: sportingEventSearch};

    const state = reducer(initialState, actions.clearSportingEventSearch());

    expect(state.sportingEventSearch).toEqual(
        expectedState
    );

})