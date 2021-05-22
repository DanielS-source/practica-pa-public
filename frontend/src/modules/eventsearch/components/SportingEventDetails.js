import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl';
import {useParams} from 'react-router-dom';

import users from '../../users';
import * as selectors from '../selectors';
import * as actions from '../actions';
import {BackLink} from '../../common';
import RegistrationForm from "../../registrations/components/RegistrationForm";
import DeliverDorsalForm from "../../registrations/components/DeliverDorsalForm";

const SportingEventDetails = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const event = useSelector(selectors.getSportingEvent);
    const types = useSelector(selectors.getSportingEventTypes);
    const provinces = useSelector(selectors.getProvinces);
    const isEmployee = useSelector(users.selectors.isEmployee);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {

        const eventId = Number(id);

        if (!Number.isNaN(eventId)) {
            dispatch(actions.findSportingEventsById(eventId));
        }

        return () => dispatch(actions.clearSportingEvent());

    }, [id, dispatch]);

    if (!event) {
        return null;
    }

    const maxParticipants = () => {
        return event.participants===event.maxParticipants
    };

    const onTime24 = () => {
        var date = new Date(event.testStart)
        date.setHours(date.getHours() + 24)
        return date > Date.now()
    };

    const onTime12 = () => {
        var date = new Date(event.testStart)
        date.setHours(date.getHours() + 12)
        return date > Date.now()
    };

    return (

        <div>

            <BackLink/>

            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.sportTestTypeId'/>:&nbsp;
                            {selectors.getSportingEventTypeName(types, event.sportTestTypeId)}
                    </p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.provinceId'/>:&nbsp;
                            {selectors.getProvinceName(provinces, event.provinceId)}
                    </p>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.testStart'/>
                        : <FormattedDate value={new Date(event.testStart)}/>
                    </p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.location'/>
                        : {event.location}
                    </p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.participants'/>
                        : {event.participants}
                    </p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.maxParticipants'/>
                        : {event.maxParticipants}
                    </p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.price'/>
                        : <FormattedNumber value={event.price}/>€
                    </p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.averageRating'/>
                        : {event.isRated === true ? <FormattedNumber value={event.averageRating}/> : <FormattedMessage id='project.global.fields.NotRated'/>}
                    </p>
                </div>
            </div>

            {maxParticipants() && onTime24() &&
            <h6>
                <FormattedMessage id='project.global.fields.maxParticipants'/>
            </h6>
            }

            {!maxParticipants() && !onTime24() &&
            <h6>
                <FormattedMessage id='project.global.fields.notOnTime'/>
            </h6>
            }

            {!onTime12() &&
            <h6>
                <FormattedMessage id='project.global.fields.notOnTime12'/>
            </h6>
            }

            {loggedIn && !isEmployee && !maxParticipants() && onTime24() &&
                <div>
                    <br/>
                        <RegistrationForm SportingEventId={event.id}/>
                </div>
            }

            {loggedIn && isEmployee && onTime12() &&
                <div>
                    <br/>
                        <DeliverDorsalForm SportingEventId={event.id}/>
                </div>
            }
        </div>

    );

}

export default SportingEventDetails;