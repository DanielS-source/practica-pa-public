import React from 'react';
import {BackLink} from "../../common";
import RateRegistrationForm from "./RateRegistrationForm";
import {useParams} from "react-router-dom";


const RateRegistration = () => {

    const {id} = useParams();

    return (
        <div>
            <BackLink/>
            <RateRegistrationForm id={id}/>
        </div>
    )

}

export default RateRegistration;