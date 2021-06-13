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

    const sportingEventTypes = [
        {
            id: 2,
            name: 'Ciclismo'
        },
        {
            id: 1,
            name: 'Running'
        }
    ];

    const provinces = [
        {
            id: 1,
            name: 'A Coruña'
        },
        {
            id: 2,
            name: 'Pontevedra'
        }
    ];

    const initialState = {
        eventSearch: {
            sportingEventSearch: null,
            provinces: provinces,
            sportingEventTypes: sportingEventTypes
        },
    }

    const findSpy = jest.spyOn(actions, 'findSportingEvents').mockImplementation(
        _criteria => {}
    )

    const {getByTestId, getByRole, history} = renderComponent(<FindSportingEvents/>,
        initialState);

    const provinceIdInput = getByTestId('provinces');
    const sportTestTypeIdInput = getByTestId('sportingType');
    const startDateInput = getByTestId('startDate');
    const endDateInput = getByTestId('endDate');

    const searchButton = getByRole('button')

    const provinceId = 1;
    const sportTestTypeId = 1;
    const startDate = '2020-05-12';
    const endDate = '2023-05-12';

    fireEvent.change(provinceIdInput, {target: {value: provinceId}});
    fireEvent.change(sportTestTypeIdInput, {target: {value: sportTestTypeId}});
    fireEvent.change(startDateInput, {target: {value: startDate}});
    fireEvent.change(endDateInput, {target: {value: endDate}});

    fireEvent.click(searchButton);

    const expectedCriteria = {
        provinceId: provinceId,
        sportTestTypeId: sportTestTypeId,
        startDate: startDate,
        endDate: endDate,
        page: 0
    };

    expect(findSpy.mock.calls[0][0]).toEqual(expectedCriteria);
    expect(history.length).toEqual(1);
    expect(history.location.pathname).toEqual('/');
})