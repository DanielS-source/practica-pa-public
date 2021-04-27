import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FindSportingEvents, FindSportingEventsResult} from "../../eventsearch";

const Home = () => (
    <div className="text-center">
        <FormattedMessage id="project.app.Home.welcome"/>
        <FindSportingEventsResult/>
    </div>
);

export default Home;
