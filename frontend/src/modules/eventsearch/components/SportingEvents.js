import React from 'react';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl';
import PropTypes from 'prop-types';

import * as selectors from '../selectors';
import SportingEventLink from "../../common/components/SportingEventLink";

const SportingEvents = ({sportingEvents, sportingEventTypes, provinces}) => (

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
                    <td>{selectors.getSportingEventTypeName(sportingEventTypes, sportingEvent.sportTestTypeId)}</td>
                    <td>{selectors.getProvinceName(provinces,sportingEvent.provinceId)}</td>
                    <td><FormattedDate day={'2-digit'} month={"2-digit"} year={'numeric'} hour={"2-digit"} minute={"2-digit"} value={new Date(sportingEvent.testStart)}/></td>
                    <td>{sportingEvent.isRated === true ? <FormattedNumber value={sportingEvent.averageRating}/> : <FormattedMessage id='project.global.fields.NotRated'/>}</td>
                </tr>
            )}
        </tbody>

    </table>

);

SportingEvents.propTypes = {
    sportingEvents: PropTypes.array.isRequired,
    sportingEventTypes: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired
}

export default SportingEvents;