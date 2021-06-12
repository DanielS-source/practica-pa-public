import reducer from './reducer';
import * as actions from './actions';

test('FIND_SPORTING_EVENTS_COMPLETED', () => {

    const sportingEventSearch = null;
    const initialState = null;

    const state = reducer(initialState, actions.findSportingEventsCompleted(sportingEventSearch));

    expect(state.sportingEventSearch).toEqual(
        {criteria: null, result: null}
    )

})