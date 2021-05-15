import React, {useState} from 'react';
import * as actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {Errors} from "../../common";
import {FormattedMessage} from "react-intl";

const RateRegistrationForm = ({id}) => {

    const dispatch = useDispatch();
    const [score, setScore] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            actions.rateRegistration(id, score,
                score => setScore(score),
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
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.registrations.rate.title"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="punctuation" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.rating"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="punctuation" className="form-control"
                                       value={score}
                                       onChange={e => setScore(e.target.value)}
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
                                    <FormattedMessage id="project.global.buttons.ratingButton"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RateRegistrationForm;