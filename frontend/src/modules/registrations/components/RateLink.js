import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";

const RateLink = ({id}) => {

    return (
        <Link to={`/registrations/rate-registrations/${id}`}>
            <FormattedMessage id='project.global.fields.rate'/>
        </Link>
    );

}

RateLink.propTypes = {
    id: PropTypes.number.isRequired
};

export default RateLink;