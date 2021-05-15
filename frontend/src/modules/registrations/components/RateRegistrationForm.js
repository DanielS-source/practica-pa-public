import React, {useState} from 'react';
import * as actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {Errors} from "../../common";

const RateRegistrationForm = ({id}) => {

    const dispatch = useDispatch();
    const [score, setScore] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.rateRegistration(id, score,
                () => null,
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

        </div>

    );
}

export default RateRegistrationForm;