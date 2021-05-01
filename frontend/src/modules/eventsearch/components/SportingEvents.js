import React from 'react';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl';
import PropTypes from 'prop-types';

import * as selectors from '../selectors';
import SportingEventLink from "../../common/components/SportingEventLink";

const SportingEvents = ({sportingEvents, eventType, province}) => (

    <table className="table table-striped table-hover">

        <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.name'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.sportTestTypeId'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.provinceId'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.testStart'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.averageRating'/>
                </th>
            </tr>
        </thead>

        <tbody>
            {sportingEvents.map(sportingEvent =>
                <tr key={sportingEvent.id}>
                    <td><SportingEventLink id={sportingEvent.id} name={sportingEvent.name} /></td>
                    <td>{selectors.getSportingEventTypeNames(eventType, sportingEvent.sportingEventTypeId)}</td>
                    <td>{selectors.getProvinceNames(province,sportingEvent.provinceId)}</td>
                    <td><FormattedDate value={new Date(sportingEvent.testStart)}/></td>
                    <td><FormattedNumber value={sportingEvent.averageRating}/></td>
                </tr>
            )}
        </tbody>

    </table>

);

SportingEvents.propTypes = {
    sportingEvents: PropTypes.array.isRequired,
    eventType: PropTypes.array.isRequired,
    province: PropTypes.array.isRequired
}

export default SportingEvents;