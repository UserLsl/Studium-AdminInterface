import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import Dashboard from '../components/containers/dashboard';
import User from '../components/containers/user/user';
import Category from '../components/containers/category/category';
import Post from '../components/containers/post/post';
import ReportPost from '../components/containers/report/reportPost';
import ReportComment from '../components/containers/report/reportComment';

export default props => {
    return (
        <Router history={hashHistory}>
            <Route path='/' component={Dashboard} />
            <Route path="/users" component={User} />
            <Route path="/categories" component={Category} />
            <Route path="/post" component={Post} />
            <Route path="/reportComments" component={ReportComment} />
            <Route path="/reportPosts" component={ReportPost} />
            <Redirect from="*" to="/" />
        </Router>
    );
}