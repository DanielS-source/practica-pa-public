import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const DeliverDorsalForm = ({SportingEventId}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [creditCard, setCreditCard] = useState('');
    const [inscriptionId, setInscriptionId] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.deliverDorsal(inscriptionId.trim(), SportingEventId, creditCard.trim(),
                () => history.push('/registrations/inscription-completed'),
                errors => setBackendErrors(errors)));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    return (
        <div>
            <Errors errors={backendErrors}
                    onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.registrations.dorsalForm.title"/>
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
                                    <FormattedMessage id="project.global.buttons.dorsal"/>
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