import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';

const FindSportingEvents = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [categoryId, setCategoryId] = useState('');
    const [keywords, setKeywords] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findSportingEvents(
            {categoryId: toNumber(categoryId),
                keywords: keywords.trim(), page: 0}));
        history.push('/catalog/find-products-result');
    }

}