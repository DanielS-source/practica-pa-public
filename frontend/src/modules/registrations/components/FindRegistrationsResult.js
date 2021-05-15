import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';
import Registrations from "./Registrations";

const FindRegistrationResult = () => {

    const registrationSearch = useSelector(selectors.getRegistrationSearch());
    const dispatch = useDispatch();

    if (!registrationSearch) {
        return null;
    }

    if (registrationSearch.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.registrations.noInscriptions'/>
            </div>
        );
    }

    return (

        <div>
            <Registrations registrations={registrationSearch.result.items}/>
            <Pager
                back={{
                    enabled: registrationSearch.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindRegistrationsResultPage(registrationSearch.criteria))}}
                next={{
                    enabled: registrationSearch.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindRegistrationsResultPage(registrationSearch.criteria))}}/>
        </div>

    );

}

export default FindRegistrationResult;