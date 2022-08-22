import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// DASHBOARDS

import BasicDashboard from './Basic/';
import CampaignsDashboard from './Campaign/';
import MarketplaceDashboard from './Marketplace/';
import Profile from './Profile/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Dashboards = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/campaign`} component={BasicDashboard}/>
                    <Route path={`${match.url}/campaigns`} component={CampaignsDashboard}/>
                    <Route path={`${match.url}/marketplace`} component={MarketplaceDashboard}/>
                    <Route path={`${match.url}/profile`} component={Profile}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Dashboards;