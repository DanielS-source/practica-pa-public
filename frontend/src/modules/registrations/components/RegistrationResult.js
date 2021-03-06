import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';

const RegistrationResult = () => {

    const inscription = useSelector(selectors.getInscription);

    if (!inscription) {
        return null;
    }

    return (
        <div>
            <div className="card text-center">
                <h5 className="card-header">
                    <FormattedMessage id="project.registrations.regComplete"/>
                </h5>
                <p className="card-text">
                    <FormattedMessage id='project.global.fields.inscriptionId'/>
                    : {inscription.id}
                </p>
                <p className="card-text">
                    <FormattedMessage id='project.global.fields.inscriptionDorsal'/>
                    : {inscription.dorsal}
                </p>
            </div>
        </div>
    );
}

export default RegistrationResult;