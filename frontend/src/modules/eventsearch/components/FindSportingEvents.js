import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import SportingEventTypeSelector from "./SportingEventTypeSelector";
import ProvinceSelector from "./ProvinceSelector";

const FindSportingEvents = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [provinceId, setProvinceId] = useState('');
    const [sportingEventTypeId, setSportingEventTypeId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findSportingEvents(
            {provinceId: toNumber(provinceId),
                sportingEventTypeId: toNumber(sportingEventTypeId),
                startDate: startDate.trim(),
                endDate: endDate.trim(),
                page: 0}));
    }

    const toNumber = value => value.length > 0 ? Number(value) : null;

    return (

        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>

            <SportingEventTypeSelector id="sportingEventTypeId" className="custom-select my-1 mr-sm-2"
                              value={sportingEventTypeId} onChange={e => setSportingEventTypeId(e.target.value)}/>

            <ProvinceSelector id="provinceId" className="custom-select my-1 mr-sm-2"
                              value={provinceId} onChange={e => setProvinceId(e.target.value)}/>

            <input id="startDate" type="text" className="form-control mr-sm-2"
                   value={startDate} onChange={e => setStartDate(e.target.value)}/>

            <input id="endDate" type="text" className="form-control mr-sm-2"
                   value={endDate} onChange={e => setEndDate(e.target.value)}/>

            <button type="submit" className="btn btn-primary my-2 my-sm-0">
                <FormattedMessage id='project.global.buttons.search'/>
            </button>

        </form>

    );

}

export default FindSportingEvents;