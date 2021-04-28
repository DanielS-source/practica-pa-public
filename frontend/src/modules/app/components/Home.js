import React from 'react';
import {FormattedMessage} from 'react-intl';
import {FindSportingEvents, FindSportingEventsResult} from "../../eventsearch";

/*<FormattedMessage id="project.app.Home.welcome"/>*/

const Home = () => (
    <div className="text-center">
        <FindSportingEventsResult/>
    </div>
);

export default Home;
