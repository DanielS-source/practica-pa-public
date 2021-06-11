import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {IntlProvider} from "react-intl";

import messages from '../../../i18n/messages';
import {Router} from "react-router-dom";
import * as actions from '../actions';

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

afterEach(() => actions.findSportingEvents.mockRestore());

test('find - success', () => {

})

test('find - backend errors', () => {

})