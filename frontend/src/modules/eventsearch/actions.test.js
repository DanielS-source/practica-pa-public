import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import backend from '../../backend';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

afterEach(() => backend.searchService.findSportingEvents.mockRestore());

test('findSportingEvents - success', () => {

    const backendFindSpy = jest.spyOn(backend.searchService, 'findSportingEvents').mockImplementation(
        ({_provinceId, _sportTestTypeId, _startDate, _endDate, _page}, onSuccess)
    )

    const criteria = {
        provinceId: null,
        sportTestTypeId: null,
        startDate: null,
        endDate: null,
        page: null};

    const sportingEventSearch = null;

    criteria.provinceId = null;
    criteria.sportTestTypeId = null;
    criteria.startDate = null;
    criteria.endDate = null;
    criteria.page = 0;

    const action = actions.findSportingEvents(criteria);
    const expectedActions = [actions.clearSportingEvent(),actions.findSportingEventsCompleted(sportingEventSearch)];
    const store = mockStore({});

    store.dispatch(action)

    expect(backendFindSpy.mock.calls[0][0]).toEqual(criteria);

    expect(store.getActions()).toEqual(expectedActions);


})