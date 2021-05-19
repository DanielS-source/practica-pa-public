import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

const ScoreSelector = (selectProps) => {

    return (

        <select {...selectProps}>

            <FormattedMessage id='project.catalog.ScoreSelector.NotScore'>
                {message => (<option value="">{message}</option>)}
            </FormattedMessage>

            <option key={1} value={1}>{1}</option>
            <option key={2} value={2}>{2}</option>
            <option key={3} value={3}>{3}</option>
            <option key={4} value={4}>{4}</option>
            <option key={5} value={5}>{5}</option>


        </select>

    );

}

ScoreSelector.propTypes = {
    selectProps: PropTypes.object
};

export default ScoreSelector;