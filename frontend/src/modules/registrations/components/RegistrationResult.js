import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import InscriptionLink from "../../common/components/InscriptionLink";

const RegistrationResult = () => {

    const inscriptionId = useSelector(selectors.getLastInscriptionId);

    if (!inscriptionId) {
        return null;
    }

    return (
        <div className="alert alert-success" role="alert">
            <FormattedMessage id="project.registrations.RegCompleted.inscriptionGenerated"/>:
            &nbsp;
            <InscriptionLink id={inscriptionId}/>
        </div>
    );

}

export default RegistrationResult;