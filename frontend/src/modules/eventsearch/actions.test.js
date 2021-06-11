import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import backend from '../../backend';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

afterEach(() => backend.searchService.findSportingEvents.mockRestore());

test('find - success', () => {

})

test('find - backend errors', () => {

})