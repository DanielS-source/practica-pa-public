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
    const userRole = useSelector(users.selectors.getUserRole);
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
        return event.participants==event.maxParticipants
    };

    const onTime = () => {
        return Date(event.testStart)>Date.now()
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
                        : {event.averageRating}
                    </p>
                </div>
            </div>

            {maxParticipants() && onTime() &&
            <h6>
                <FormattedMessage id='project.global.fields.maxParticipants'/>
            </h6>
            }

            {!maxParticipants() && !onTime() &&
            <h6>
                <FormattedMessage id='project.global.fields.notOnTime'/>
            </h6>
            }

            {loggedIn && userRole==="USER" && !maxParticipants() && onTime() &&
                <div>
                    <br/>
                        <RegistrationForm SportingEventId={event.id}/>
                </div>
            }

            {loggedIn && userRole==="EMPLOYEE" &&
                <div>
                    <br/>
                        <DeliverDorsalForm SportingEventId={event.id}/>
                </div>
            }
        </div>

    );

}

export default SportingEventDetails;