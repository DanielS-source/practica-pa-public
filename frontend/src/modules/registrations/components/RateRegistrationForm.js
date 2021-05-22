import React, {useState} from 'react';
import * as actions from "../actions";
import {Errors, Success} from "../../common";
import {FormattedMessage} from "react-intl";
import {useSelector, useDispatch} from "react-redux";
import * as selectors from '../selectors';

const RateRegistrationForm = ({id}) => {

    const registrationSearch = useSelector(selectors.getRegistrationSearch);
    const dispatch = useDispatch();
    const [score, setScore] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const GetInscName = registrationSearch => {
        let reg;
        let registrations = registrationSearch.result.items;
        for (reg of registrations) {
            if (id == reg.id) {
                return reg.sportTestName;
            }
        }

    }

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            let reg;
            let registrations = registrationSearch.result.items;
            for (reg of registrations) {
                if (id == reg.id) {
                    reg.score = score
                    dispatch(actions.rateRegistration(reg));
                    break
                }
            }

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
                                <FormattedMessage id="project.global.fields.sportTestId"/>
                            </label>
                            <div className="col-md-4">
                                {GetInscName(registrationSearch)}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="punctuation" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.rating"/>
                            </label>
                            <div className="col-md-4">
                                <select className="custom-select my-1 mr-sm-2"
                                        value={score}
                                        onChange={e => setScore(e.target.value)}
                                        required>
                                    <FormattedMessage id='project.catalog.ScoreSelector.NotScore'>
                                        {message => (<option value="">{message}</option>)}
                                    </FormattedMessage>
                                    <option key={1} value={1}>1</option>
                                    <option key={2} value={2}>2</option>
                                    <option key={3} value={3}>3</option>
                                    <option key={4} value={4}>4</option>
                                    <option key={5} value={5}>5</option>
                                </select>
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