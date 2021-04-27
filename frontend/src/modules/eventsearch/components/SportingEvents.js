import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import * as selectors from '../selectors';
import SportingEventLink from "../../common/components/SportingEventLink";

const SportingEvents = ({sportingEvents}) => (

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
            {sportingEvents.map(event =>
                <tr key={event.id}>
                    <td><SportingEventLink id={event.id} name={event.name} type={event.sportingEventTypeId} province={event.provinceId} start={event.startDate} avg={event.avg}/></td>
                </tr>
            )}
        </tbody>

    </table>

);

SportingEvents.propTypes = {
    events: PropTypes.array.isRequired,
}

export default SportingEvents;