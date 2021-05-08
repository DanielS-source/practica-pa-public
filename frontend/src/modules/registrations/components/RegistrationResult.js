import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import InscriptionLink from "../../common/components/InscriptionLink";

const RegistrationResult = () => {

    const inscription = useSelector(selectors.getInscription);

    if (!inscription) {
        return null;
    }

    return (
        <div className="card bg-light border-dark">
            <p className="card-text">
                <FormattedMessage id='project.registrations.fields.inscriptionId'/>
                    &nbsp;
                <InscriptionLink inscription.id/>
            </p>
            <p className="card-text">
                <FormattedMessage id='project.registrations.fields.inscriptionDorsal'/>
                    : {inscription.dorsal}
            </p>
        </div>
    );

}

export default RegistrationResult;