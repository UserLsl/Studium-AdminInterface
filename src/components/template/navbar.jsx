import React, { useState, useEffect } from 'react';



export default props => {
    const [state, setState] = useState({
        open: false
    });

    const imgProfile = (props.user.userImageURL) ? props.user.userImageURL : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";


    function changeOpen() {
        setState({ open: !state.open });
    }


    return (
        <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
                <li onMouseLeave={() => changeOpen()} className={`dropdown user user-menu ${state.open ? 'open' : ''}`}>
                    <a style={{ "cursor": "pointer" }} onClick={() => changeOpen()}
                        aria-expanded={state.open ? 'true' : 'false'}
                        className="dropdown-toggle"
                        data-toggle="dropdown">
                        <img src={imgProfile} className="user-image" alt="User Image" />
                        <span>&nbsp;{props.user.nickname}</span><span>&nbsp;&nbsp;</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li className="user-header">
                            <img src={imgProfile} className="img-circle" alt="User Image"></img>
                            <p>{props.user.nickname} - {props.user.userRanking}<small>{props.user.username}</small></p>
                        </li>
                        <li className="user-footer">
                            {/* <div className="pull-left">
                                <a href="#" className="btn btn-default btn-flat">Profile</a>
                            </div> */}
                            <div className="pull-right">
                                <a style={{ "cursor": "pointer" }} className="btn btn-default btn-flat" href="https://archetypeofficial.herokuapp.com/logout?redir=http://localhost:3000" >Sair da conta</a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );

}
