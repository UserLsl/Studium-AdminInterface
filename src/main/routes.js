import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import Dashboard from '../components/containers/dashboard/dashboard';
import AdminUser from '../components/containers/adminUser/adminUser';

export default props => {
    return (
        <Router history={hashHistory}>
            <Route path='/' component={Dashboard} />
            <Route path="/users" component={AdminUser} />
            <Redirect from="*" to="/" />
        </Router>
    );
}