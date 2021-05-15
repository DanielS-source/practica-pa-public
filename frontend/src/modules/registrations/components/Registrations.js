import React from 'react';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from 'prop-types';
import RegistrationLink from "./RegistrationLink";
import RateLink from "./RateLink";

const Registrations = ({registrations}) => (

    <table className="table table-striped table-hover">

        <thead>
        <tr>
            <th scope="col">
                <FormattedMessage id='project.global.fields.inscription'/>
            </th>
            <th scope="col">
                <FormattedMessage id='project.global.fields.date'/>
            </th>
        </tr>
        </thead>

        <tbody>
        {registrations.map(reg =>
            <tr key={reg.id}>
                <td><RegistrationLink id={reg.id}/></td>
                <td><RateLink id={reg.id}/></td>
                <td>
                    <FormattedDate value={new Date(reg.date)}/> - <FormattedTime value={new Date(reg.date)}/>
                </td>
            </tr>
        )}
        </tbody>

    </table>

);

Registrations.propTypes = {
    registrations: PropTypes.array.isRequired
};

export default Registrations;