import React from 'react';
import {FindSportingEvents, FindSportingEventsResult} from "../../eventsearch";


const Home = () => (
    <div className="text-center">
        <FindSportingEvents/>
        <FindSportingEventsResult/>
    </div>
);

export default Home;
