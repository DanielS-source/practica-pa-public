import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history'

import {IntlProvider} from "react-intl";
import messages from '../../../i18n/messages';
import {Router} from "react-router-dom";
import * as actions from '../actions';
import RateRegistrationForm from "./RateRegistrationForm";

const renderComponent = (component, initialState ={})=> {

    const store = createStore(() => initialState);
    store.dispatch = jest.fn();
    const history = createMemoryHistory();

    return {history, ...render(
        <Provider store={store}>
            <IntlProvider locale="en" messages={messages['en']}>
                <Router history ={history}>
                    {component}
                </Router>
            </IntlProvider>
        </Provider>
    )};
}

afterEach(() => actions.rateRegistration.mockRestore());

test('rate event - success', () => {
    const registrationId = 1;
    const registration = {id: registrationId, sportTestName: "m", score: 0};
    const regSearch = {criteria: {}, result: {items: [registration]}};
    const initialState = {inscription: 1, registrationSearch: {criteria: {}, result: {items: [registration]}}};
    const rateRegistrationSpy = jest.spyOn(actions, 'rateRegistration').mockImplementation(
        (_registration, onSuccess, _onErrors) =>
            onSuccess());
    const {getByTestId, getByRole, history} = renderComponent(<RateRegistrationForm id={registrationId}/>,
        initialState);
    const scoreInput = getByTestId("score");
    const scoreButton = getByRole("button");
    const score = 3;

    fireEvent.change(scoreInput, {target: {value: score}});
    fireEvent.click(scoreButton);

    expect(findSpy.mock.calls[0][0]).toEqual(registration);
    expect(history.length).toEqual(1);
    expect(history.location.pathname).toEqual('/');
})

test('rate event - backend errors', () => {
    const backendError = "Some backend error";
    const registrationId = 1;
    const registration = {id: registrationId, sportTestName: "m", score: 0};
    const regSearch = {criteria: {}, result: {items: [registration]}};
    const initialState = {inscription: 1, registrationSearch: {criteria: {}, result: {items: [registration]}}};
    const rateRegistrationSpy = jest.spyOn(actions, 'rateRegistration').mockImplementation(
        (_registration, _onSuccess, onErrors) =>
            onErrors({globalError: backendError}));
    const {getByTestId, getByRole, container, history} = renderComponent(<RateRegistrationForm id={registrationId}/>,
        initialState);
    const scoreInput = getByTestId("score");
    const scoreButton = getByRole("button");
    const score = 3;

    fireEvent.change(scoreInput, {target: {value: score}});
    fireEvent.click(scoreButton);

    expect(container).toHaveTextContent(backendError);
    expect(history.length).toEqual(1);
    expect(history.location.pathname).toEqual('/');
})