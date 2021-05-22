import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import RateLink from "./RateLink";
import SportingEventLink from "../../common/components/SportingEventLink";

const Registrations = ({registrations}) => (

    <table className="table table-striped table-hover">

        <thead>
        <tr>
            <th scope="col">
                <FormattedMessage id='project.global.fields.inscriptionId'/>
            </th>
            <th scope="col">
                <FormattedMessage id='project.global.fields.creditCard'/>
            </th>
            <th scope="col">
                <FormattedMessage id='project.global.fields.inscriptionDorsal'/>
            </th>
            <th scope="col">
                <FormattedMessage id='project.global.fields.dorsalPicked'/>
            </th>
            <th scope="col">
                <FormattedMessage id='project.global.fields.sportTestId'/>
            </th>
            <th scope="col">
                <FormattedMessage id='project.global.fields.rating'/>
            </th>
        </tr>
        </thead>

        <tbody>
        {registrations.map(reg =>
            <tr key={reg.id}>
                <td> {reg.id} </td>
                <td> {reg.creditCardNumber} </td>
                <td> {reg.dorsal} </td>
                <td> {reg.dorsalPicked.toString() === 'false' ?
                    <FormattedMessage id='project.global.fields.negation'/> : <FormattedMessage id='project.global.fields.affirmation'/>} </td>
                <td><SportingEventLink id={reg.sportTestId} name={reg.sportTestName} /></td>
                <td> {reg.score === 0 ? <RateLink id={reg.id}/> : reg.score} </td>
            </tr>
        )}
        </tbody>

    </table>

);

Registrations.propTypes = {
    registrations: PropTypes.array.isRequired
};

export default Registrations;