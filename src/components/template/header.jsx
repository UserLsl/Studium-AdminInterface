import React from 'react';

import Navbar from './navbar';

export default props => {
    return (
        <header className="main-header">
            <a href="/#/" className="logo">
                <span className="logo-mini"><b>S</b></span>
                <span className="logo-lg">
                    <i className="fa fa-shield"></i>
                    <b> S</b>tudium
            </span>
            </a>
            <nav className="navbar navbar-static-top">
                <a href="#" className="sidebar-toggle" data-toggle="offcanvas"></a>

                <Navbar user={props.user} />
                {/* <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">

                        
                        <li className="dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img src="https://http2.mlstatic.com/D_NQ_NP_614041-MLB27185740295_042018-O.jpg" className="user-image" alt="User Image"></img>
                                <span className="hidden-xs">Alexander Pierce</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="user-header">
                                    <img src="https://http2.mlstatic.com/D_NQ_NP_614041-MLB27185740295_042018-O.jpg" className="img-circle" alt="User Image"></img>

                                    <p>
                                            Alexander Pierce - Web Developer
                                        <small>Member since Nov. 2012</small>
                                    </p>
                                </li>
                                <li className="user-body">
                                    <div className="row">
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Followers</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Sales</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Friends</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="user-footer">
                                    <div className="pull-left">
                                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                                    </div>
                                    <div className="pull-right">
                                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div> */}
            </nav>
        </header>
    );
}