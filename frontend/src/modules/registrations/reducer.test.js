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

    const reg = {id: 1, score: 0}
    const initialState = {inscription: 1, registrationSearch: {criteria: {}, result: {items: [reg]}}}

    const res = {id: registrationId, score: 3}
    const state = reducer(initialState, actions.rateRegistrationCompleted({id: registrationId, score: 3}));
    expect(state.registrationSearch.result.items).toEqual([res]);
    expect(state.registrationSearch.result.items[0].score).toEqual(res.score);
})

