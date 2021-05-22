import React, {useState} from 'react';
import * as actions from "../actions";
import {Errors, Success} from "../../common";
import {FormattedMessage} from "react-intl";
import ScoreSelector from "./ScoreSelector";
import ProvinceSelector from "../../eventsearch/components/ProvinceSelector";
import {useDispatch} from "react-redux";

const RateRegistrationForm = ({id}) => {

    const dispatch = useDispatch();
    const [score, setScore] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.rateRegistration(id, score,
                score => setScore(score),
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
            <Success message={score}
                     onClose={() => setScore(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.registrations.rateForm"/>
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
                                <ScoreSelector id="scoreForm" className="custom-select my-1 mr-sm-2"
                                               value={score} onChange={e => setScore(e.target.value)}/>
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