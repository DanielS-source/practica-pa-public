import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {FindSportingEventsResult, SportingEventDetails} from "../../eventsearch";
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindRegistrations, RegistrationResult} from "../../registrations";
import FindRegistrationResult from "../../registrations/components/FindRegistrationsResult";

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/search/find-sporting-events-result"><FindSportingEventsResult/></Route>
                <Route exact path="/search/sporting-event-details/:id"><SportingEventDetails/></Route>
                {loggedIn && <Route exact path="/registrations/inscription-completed"><RegistrationResult/></Route>}
                {loggedIn && <Route exact path="/registrations/find-registrations"><FindRegistrations/></Route>}
                {loggedIn && <Route exact path="/registrations/find-registrations-result"><FindRegistrationResult/></Route>}
                {loggedIn && <Route exact path="/users/update-profile"><UpdateProfile/></Route>}
                {loggedIn && <Route exact path="/users/change-password"><ChangePassword/></Route>}
                {loggedIn && <Route exact path="/users/logout"><Logout/></Route>}
                {!loggedIn && <Route exact path="/users/login"><Login/></Route>}
                {!loggedIn && <Route exact path="/users/signup"><SignUp/></Route>}
                <Route><Home/></Route>
            </Switch>
        </div>

    );

};

export default Body;
