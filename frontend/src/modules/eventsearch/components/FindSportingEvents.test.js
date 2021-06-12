import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {IntlProvider} from "react-intl";

import messages from '../../../i18n/messages';
import {Router} from "react-router-dom";
import * as actions from '../actions';
import FindSportingEvents from "./FindSportingEvents";

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

test('findSportingEvents - success', () => {

    const initialState = {eventSearch: {sportingEventSearch: null}}

    const findSpy = jest.spyOn(actions, 'findSportingEvents').mockImplementation(
        ({_provinceId, _sportTestTypeId, _startDate, _endDate, _page})
    )

    const {getByLabelText, getByRole, getByPlaceholderText, getByTestId, history} = renderComponent(<FindSportingEvents/>,
        initialState);

    const provinceIdInput = getByPlaceholderText('All Provinces');
    const sportTestTypeIdInput = getByPlaceholderText('All Sporting Event Types');
    const startDateInput = getByLabelText('');
    const endDateInput = getByLabelText('');

    const searchButton = getByRole('button')

    const provinceId = 1;
    const sportTestTypeId = 1;
    const startDate = '2020-05-12';
    const endDate = '2020-05-12';

    fireEvent.change(provinceIdInput, {target: {value: provinceId}});
    fireEvent.change(sportTestTypeIdInput, {target: {value: sportTestTypeId}});
    fireEvent.change(startDateInput, {target: {value: startDate}});
    fireEvent.change(endDateInput, {target: {value: endDate}});

    fireEvent.click(searchButton);

    expect(findSpy.mock.calls[0][0]).toEqual(provinceId);
    expect(findSpy.mock.calls[0][1]).toEqual(sportTestTypeId);
    expect(findSpy.mock.calls[0][2]).toEqual(startDate);
    expect(findSpy.mock.calls[0][3]).toEqual(endDate);
    expect(findSpy.mock.calls[0][4]).toEqual(page);

    expect(history.length).toEqual(2);
    expect(history.location.pathname).toEqual('/shopping/purchase-completed');

})