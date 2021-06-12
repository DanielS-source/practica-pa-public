import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import backend from '../../backend';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

afterEach(() => backend.searchService.findSportingEvents.mockRestore());

test('findSportingEvents - success', () => {

    const backendFindSpy = jest.spyOn(backend.searchService, 'findSportingEvents').mockImplementation(
        ({_provinceId, _sportTestTypeId, _startDate, _endDate, _page})
    )

    const sportingEventSearch = null;

    const provinceId = 1;
    const sportTestTypeId = 1;
    const startDate = 1;
    const endDate = 1;
    const page = 1;

    const action = actions.findSportingEvents(provinceId, sportTestTypeId, startDate, endDate, page);
    const expectedActions = [actions.findSportingEventsCompleted(sportingEventSearch)];
    const store = mockStore({});

    store.dispatch(action)

    expect(backendFindSpy.mock.calls[0][0]).toEqual(provinceId);
    expect(backendFindSpy.mock.calls[0][1]).toEqual(sportTestTypeId);
    expect(backendFindSpy.mock.calls[0][2]).toEqual(startDate);
    expect(backendFindSpy.mock.calls[0][3]).toEqual(endDate);
    expect(backendFindSpy.mock.calls[0][4]).toEqual(page);

    expect(store.getActions()).toEqual(expectedActions);


})