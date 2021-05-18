import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, useIntl} from 'react-intl';
import Success from "./Success";

const SuccessNotification = ({message, onClose}) => {

    if (!message) {
        return null;
    }

    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            <FormattedMessage id='project.global.fields.SuccessNotification '/>
            {message['dorsal']}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                    onClick={() => onClose()}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );

}

Success.propTypes = {
    message: PropTypes.object,
    onClose: PropTypes.func.isRequired
};

export default SuccessNotification;