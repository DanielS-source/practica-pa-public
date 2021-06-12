import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import backend from '../../backend';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

afterEach(() => backend.searchService.findSportingEvents.mockRestore());

test('findSportingEvents - success', () => {

    const criteria = {
        provinceId: null,
        sportTestTypeId: null,
        startDate: null,
        endDate: null,
        page: null};

    const backendFindSpy = jest.spyOn(backend.searchService, 'findSportingEvents').mockImplementation(
        (_criteria, _onSuccess) => null
    )

    const sportingEventSearch = null;

    criteria.provinceId = 1;
    criteria.sportTestTypeId = 1;
    criteria.startDate = '2020-05-12';
    criteria.endDate = '2023-05-12';
    criteria.page = 0;

    const action = actions.findSportingEvents(criteria);
    const expectedActions2 = [
        sportingEventSearch,
        actions.clearSportingEventSearch()];
    const expectedActions = [
        actions.clearSportingEventSearch()
    ];

    const store = mockStore({});

    store.dispatch(action)

    //console.log(backendFindSpy.mock.calls[0][0])
    //console.log(expectedActions)

    //console.log(JSON.stringify(store.getActions()))

    expect(backendFindSpy.mock.calls[0][0]).toEqual(criteria);

    expect(store.getActions()).toEqual(expectedActions);


})