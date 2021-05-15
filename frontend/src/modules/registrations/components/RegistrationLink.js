import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const RegistrationLink = ({id}) => {

    return (
        <Link to={`/registrations/registration-details/${id}`}>
            {id}
        </Link>
    );

}

RegistrationLink.propTypes = {
    id: PropTypes.number.isRequired
};

export default RegistrationLink;