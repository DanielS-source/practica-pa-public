import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import backend from '../../backend';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

afterEach(() => backend.searchService.findSportingEvents.mockRestore());

test('findSportingEvents - success', () => {

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

    const backendFindSpy = jest.spyOn(backend.searchService, 'findSportingEvents').mockImplementation(
        (_criteria, onSuccess) => onSuccess(result)
    );

    const action = actions.findSportingEvents(criteria);

    const expectedActions = [
        actions.clearSportingEventSearch(),
        actions.findSportingEventsCompleted(sportingEventSearch)
    ];

    const store = mockStore({});

    store.dispatch(action)

    expect(backendFindSpy.mock.calls[0][0]).toEqual(criteria);
    expect(store.getActions()).toEqual(expectedActions);
})