import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {useParams} from 'react-router-dom';

import * as selectors from '../selectors';
import * as actions from '../actions';
import {BackLink} from '../../common';

const SportingEventDetails = () => {

    const event = useSelector(selectors.getSportingEvent);
    const types = useSelector(selectors.getSportingEventTypes);
    const provinces = useSelector(selectors.getProvinces);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {

        const eventId = Number(id);

        if (!Number.isNaN(eventId)) {
            dispatch(actions.findSportingEventById(eventId));
        }

        return () => dispatch(actions.clearSportingEvent());

    }, [id, dispatch]);

    if (!event) {
        return null;
    }

    return (

        <div>

            <BackLink/>

            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <h6 className="card-subtitle text-muted">
                        <FormattedMessage id='project.global.fields.type'/>:&nbsp;
                            {selectors.getSportingEventType(types, event.sportTestTypeId)}
                    </h6>
                    <h6 className="card-subtitle text-muted">
                        <FormattedMessage id='project.global.fields.province'/>:&nbsp;
                            {selectors.getProvinces(provinces, event.provinceId)}
                    </h6>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">
                        <FormattedMessage id='project.global.fields.testStart'/>
                        : {event.testStart}
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

            /*

            Para cuando incorporemos suscripciones

            {loggedIn &&
                <div>
                    <br/>
                    <AddToShoppingCart productId={product.id}/>
                </div>
            }
            */

        </div>

    );

}

export default ProductDetails;