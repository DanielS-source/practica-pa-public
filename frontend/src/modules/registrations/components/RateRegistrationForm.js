import React, {useState} from 'react';
import * as actions from "../actions";
import {Errors, Success} from "../../common";
import {FormattedMessage} from "react-intl";
import ScoreSelector from "./ScoreSelector";
import {useSelector, useDispatch} from "react-redux";
import * as selectors from '../selectors';
import Registrations from "./Registrations";
import RateLink from "./RateLink";

const RateRegistrationForm = ({id}) => {

    const registrationSearch = useSelector(selectors.getRegistrationSearch);
    const dispatch = useDispatch();
    const [score, setScore] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    if (!registrationSearch) {
        return null;
    }

    if (registrationSearch.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.registrations.noInscriptions'/>
            </div>
        );
    }

    const GetInscName = registrationSearch => {
        let reg;
        let registrations = registrationSearch.result.items;
        for (reg of registrations) {
            if (reg.id == id) {
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
                if (reg.id == id) {
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