import React from 'react';

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


                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">

                        
                        {/* <!-- User Account Menu --> */}
                        <li className="dropdown user user-menu">
                            {/* <!-- Menu Toggle Button --> */}
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                {/* <!-- The user image in the navbar--> */}
                                <img src="https://http2.mlstatic.com/D_NQ_NP_614041-MLB27185740295_042018-O.jpg" className="user-image" alt="User Image"></img>
                                {/* <!-- hidden-xs hides the username on small devices so only the image appears. --> */}
                                <span className="hidden-xs">Alexander Pierce</span>
                            </a>
                            <ul className="dropdown-menu">
                                {/* <!-- The user image in the menu --> */}
                                <li className="user-header">
                                    <img src="https://http2.mlstatic.com/D_NQ_NP_614041-MLB27185740295_042018-O.jpg" className="img-circle" alt="User Image"></img>

                                    <p>
                                            Alexander Pierce - Web Developer
                                        <small>Member since Nov. 2012</small>
                                    </p>
                                </li>
                                {/* <!-- Menu Body --> */}
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
                                    {/* <!-- /.row --> */}
                                </li>
                                {/* <!-- Menu Footer--> */}
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
                </div>
            </nav>
        </header>
    );
}