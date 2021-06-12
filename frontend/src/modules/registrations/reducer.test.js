import reducer from './reducer';
import * as actions from './actions';

test('INSCRIPTION_COMPLETED', () => {
    const registrationId = 1;
    const initialState = {inscription: null}

    const state = reducer(initialState, actions.inscriptionCompleted(registrationId));
    expect(state.inscription).toEqual(registrationId);
})

test('RATE_REGISTRATION_COMPLETED', () => {
    const registrationId = 1;
    const initialState = {inscription: null}

    const state = reducer(initialState, actions.inscriptionCompleted(registrationId));
    expect(state.inscription).toEqual(registrationId);
})

