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
                <FormattedMessage id='project.global.fields.purchaseOrder'/>
            </th>
            <th scope="col">
                <FormattedMessage id='project.global.fields.date'/>
            </th>
        </tr>
        </thead>

        <tbody>
        {registrations.map(order =>
            <tr key={order.id}>
                <td><RegistrationLink id={order.id}/></td>
                <td><RateLink id={order.id}/></td>
                <td>
                    <FormattedDate value={new Date(order.date)}/> - <FormattedTime value={new Date(order.date)}/>
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