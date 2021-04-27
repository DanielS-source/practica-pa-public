import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const SportingEventLink = ({id, name, type, province, start, avg}) => {

    return (
        <Link to={`/search/sporting-event-details/${id}`}>
            {name}
        </Link>
    );

}

SportingEventLink.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    province: PropTypes.number.isRequired,
    start: PropTypes.string.isRequired,
    avg: PropTypes.number.isRequired,
};

export default SportingEventLink;