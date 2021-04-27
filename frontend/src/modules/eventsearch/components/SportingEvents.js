import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import * as selectors from '../selectors';
import {SportingEventLink} from '../../common';

const SportingEvents = ({events}) => (

    <table className="table table-striped table-hover">

        <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.department'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.name'/>
                </th>
            </tr>
        </thead>

        <tbody>
            {events.map(event =>
                <tr key={event.id}>
                    <td><SportingEventLink id={event.id} name={event.name}/></td>
                </tr>
            )}
        </tbody>

    </table>

);

SportingEvents.propTypes = {
    events: PropTypes.array.isRequired,
}

export default SportingEvents;