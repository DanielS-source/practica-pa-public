import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import backend from '../../backend';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

afterEach(() => backend.registrationService.createRegistration.mockRestore());

test('registration - success', () => {
    const registrationId = 1;
    const backendRegistrationSpy = jest.spyOn(backend.registrationService, 'createRegistration').mockImplementation(
        (_sportTestId, _creditCard, onSuccess, _onErrors) =>
            onSuccess({id: registrationId}));
    const sportTestId = 1;
    const creditCard = "1234123412341234";
    const onSuccess = jest.fn();
    const onErrors = jest.fn();
    const action = actions.inscribe(sportTestId,creditCard,onSuccess,onErrors);
    const expectedActions = [actions.inscriptionCompleted({id: registrationId})];
    const store = mockStore({});

    store.dispatch(action);

    expect(backendRegistrationSpy.mock.calls[0][0]).toEqual(sportTestId);
    expect(backendRegistrationSpy.mock.calls[0][1]).toEqual(creditCard);
    expect(store.getActions()).toEqual(expectedActions);
    expect(onSuccess).toHaveBeenCalled();
    expect(onErrors).not.toHaveBeenCalled();
});

test('registration - backend errors', () => {
    const backendErrors = {gobalError: "Some backend error"};
    jest.spyOn(backend.registrationService, 'createRegistration').mockImplementation(
        (_sportTestId, _creditCard, _onSuccess, onErrors) =>
            onErrors(backendErrors));
    const sportTestId = 1;
    const creditCard = "1234123412341234";
    const onSuccess = jest.fn();
    const onErrors = jest.fn();
    const action = actions.inscribe(sportTestId,creditCard,onSuccess,onErrors);
    const expectedActions = [];
    const store = mockStore({});

    store.dispatch(action);

    expect(store.getActions()).toEqual(expectedActions);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onErrors).toHaveBeenCalled();
    expect(onErrors.mock.calls[0][0]).toEqual(backendErrors);
})
