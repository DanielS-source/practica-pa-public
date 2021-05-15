import React, {useState} from 'react';
import * as actions from "../actions";
import {useDispatch, useSelector} from "react-redux";

const RateRegistrationForm = ({id}) => {

    const dispatch = useDispatch();
    const [score, setScore] = useState('');
    const [inscriptionId, setInscriptionId] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.rateRegistration(inscriptionId.trim(), score,
                () => null,
                errors => setBackendErrors(errors)));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    return null;
}

export default RateRegistrationForm;