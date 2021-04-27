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
                    <td><SportingEventLink id={event.id} name={event.name} /></td>
                    <td>event.sportTestTypeId</td>
                    <td>event.provinceId</td>
                    <td>event.testStart</td>
                    <td>event.averageRating</td>
                </tr>
            )}
        </tbody>

    </table>

);

SportingEvents.propTypes = {
    events: PropTypes.array.isRequired,
}

export default SportingEvents;