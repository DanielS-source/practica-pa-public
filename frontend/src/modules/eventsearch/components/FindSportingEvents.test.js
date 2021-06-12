import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history'

import {IntlProvider} from 'react-intl';
import messages from '../../../i18n/messages';
import {Router} from 'react-router-dom';
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

    const criteria = {provinceId: null, sportTestTypeId: null, startDate: null, endDate: null, page: null};

    const findSpy = jest.spyOn(actions, 'findSportingEvents').mockImplementation(
        _criteria => null
    )

    const {getByTestId, getByRole} = renderComponent(<FindSportingEvents/>,
        initialState);

    const provinceIdInput = getByTestId('provinces');
    const sportTestTypeIdInput = getByTestId('sportingType');
    const startDateInput = getByTestId('startDate');
    const endDateInput = getByTestId('endDate');

    const searchButton = getByRole('button')

    const provinceId = null;
    const sportTestTypeId = null;
    const startDate = '2020-05-12';
    const endDate = '2023-05-12';

    criteria.provinceId = provinceId;
    criteria.sportTestTypeId = sportTestTypeId;
    criteria.startDate = startDate;
    criteria.endDate = endDate;
    criteria.page = 0;

    fireEvent.change(provinceIdInput, {target: {value: provinceId}});
    fireEvent.change(sportTestTypeIdInput, {target: {value: sportTestTypeId}});
    fireEvent.change(startDateInput, {target: {value: startDate}});
    fireEvent.change(endDateInput, {target: {value: endDate}});

    fireEvent.click(searchButton);

    expect(findSpy.mock.calls[0][0]).toEqual(criteria);
})