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
    }


    const initialState = {sportingEventSearch: null};

    const state = reducer(initialState, actions.findSportingEventsCompleted({criteria, result}));

    expect(state.sportingEventSearch).toEqual(
        {criteria: criteria, result: result}
    )

})