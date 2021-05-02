import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import * as selectors from '../selectors';

const SportingEventTypeSelector = (selectProps) => {

    const sportingEventTypes = useSelector(selectors.getSportingEventTypes);

    return (

        <select {...selectProps}>

            <FormattedMessage id='project.catalog.SportingEventTypeSelector.allTypes'>
                {message => (<option value="">{message}</option>)}
            </FormattedMessage>

            {sportingEventTypes && sportingEventTypes.map(sportingEventType =>
                <option key={sportingEventType.id} value={sportingEventType.id}>{sportingEventType.name}</option>
            )}

        </select>

    );

}

SportingEventTypeSelector.propTypes = {
    selectProps: PropTypes.object
};

export default SportingEventTypeSelector;