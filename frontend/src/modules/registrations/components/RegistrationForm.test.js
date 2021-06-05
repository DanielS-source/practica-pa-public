import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history';

import RegistrationForm from "./RegistrationForm";
import {IntlProvider} from 'react-intl';
import messages from '../../../i18n/messages';
import {Route, Router} from 'react-router-dom';
import * as actions from '../actions';

const renderComponent = (component, initialState={}) => {

    const store = createStore(() => initialState)
    store.dispatch = jest.fn();
    const history = createMemoryHistory();

    return {history, ...render(
        <Provider store = {store}>
            <IntlProvider locale="en" messages={messages['en']}>
                <Router history = {history}>
                    {component}
                </Router>
            </IntlProvider>
        </Provider>
        )};
}


afterEach(() => actions.inscribe.mockRestore());

test('registration - success', () => {
    const sportingEventId = 1;
    const initialState = {inscription: null}; //NO SE QUE ONDA CON ESTO, YO NO USO EL STATE PARA NADA EN REG FORM Y EL OTRO PIDE LA SHOPPING CART
    const registrationSpy = jest.spyOn(actions, 'inscribe').mockImplementation(
        (_sportingEventID, _creditCard, onSuccess, _onErrors) =>
            onSuccess());
    const {getByLabelText, getByRole, history} = renderComponent(<RegistrationForm SportingEventId={sportingEventId}/>, initialState)
    const creditCardInput = getByLabelText('Credit card');
    const registrationButton =  getByRole('button');
    const creditCard ='1234123412341234';

    fireEvent.change(creditCardInput, {target: {value: creditCard}});

    fireEvent.click(registrationButton);

    expect(registrationSpy.mock.calls[0][0]).toEqual(sportingEventId);
    expect(registrationSpy.mock.calls[0][1]).toEqual(creditCard);
    expect(history.length).toEqual(2);
    expect(history.location.pathname).toEqual('/registrations/inscription-completed');
})

test('registration - backend errors', () => {
    const initialState = {inscription: null}
    const backendError = "Some backend error";

    jest.spyOn(actions, 'inscribe').mockImplementation(
        (_sportTestId, _creditCard, _onSuccess, onErrors) =>
            onErrors({globalError: backendError}));
    const {getByLabelText, getByRole, container, history} = renderComponent(<RegistrationForm SportingEventId={1}/>, initialState)
    const creditCardInput = getByLabelText('Credit card');
    const registrationButton =  getByRole('button');
    const creditCard ='1234123412341234';

    fireEvent.change(creditCardInput, {target: {value: creditCard}});
    fireEvent.click(registrationButton);

    expect(container).toHaveTextContent(backendError);
    expect(history.length).toEqual(1);
    expect(history.location.pathname).toEqual('/');

})
