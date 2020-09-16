import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import Dashboard from '../components/containers/dashboard';
import User from '../components/containers/user/user';
import Category from '../components/containers/category/category';
import Post from '../components/containers/post/post';

export default props => {
    return (
        <Router history={hashHistory}>
            <Route path='/' component={Dashboard} />
            <Route path="/users" component={User} />
            <Route path="/categories" component={Category} />
            <Route path="/post" component={Post} />
            <Redirect from="*" to="/" />
        </Router>
    );
}