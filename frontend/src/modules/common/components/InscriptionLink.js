import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const InscriptionLink = ({id, name}) => {

    return (
        <Link to={`/registrations/inscription-completed/${id}`}>
            {name}
        </Link>
    );

}

InscriptionLink.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default InscriptionLink;