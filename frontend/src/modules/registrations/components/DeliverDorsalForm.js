import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {Errors, Success} from '../../common';
import backend from '../../../backend';
import SuccessNotification from "../../common/components/SuccessNotification";

const DeliverDorsalForm = ({SportingEventId}) => {

    const [creditCard, setCreditCard] = useState('');
    const [inscriptionId, setInscriptionId] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [dorsal, setDorsal] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            backend.registrationService.deliverDorsal(inscriptionId.trim(), SportingEventId, creditCard.trim(),
                dorsal => setDorsal(dorsal),
                errors => setBackendErrors(errors));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }


    return (
        <div>
            <Errors errors={backendErrors}
                    onClose={() => setBackendErrors(null)}/>
            <SuccessNotification message={dorsal}
                    onClose={() => setDorsal(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.registrations.dorsalForm"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="creditCard" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.creditCard"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="creditCard" className="form-control"
                                       value={creditCard}
                                       onChange={e => setCreditCard(e.target.value)}
                                       autoFocus
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inscriptionId" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.inscriptionId"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="userId" className="form-control"
                                       value={inscriptionId}
                                       onChange={e => setInscriptionId(e.target.value)}
                                       autoFocus
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-3 col-md-1">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.dorsalButton"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );


}

export default DeliverDorsalForm;