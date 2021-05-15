import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const RateLink = ({id}) => {

    return (
        <Link to={`/registrations/rate-registrations/${id}`}>
            {id}
        </Link>
    );

}

RateLink.propTypes = {
    id: PropTypes.number.isRequired
};

export default RateLink;