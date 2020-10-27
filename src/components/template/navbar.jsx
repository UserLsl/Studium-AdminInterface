import React, { useState, useEffect } from 'react'
import axios from 'axios'

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { logout } from '../../auth/authActions'


export default props => {
    const [state, setState] = useState({ 
        open: false, 
        // name: 'Lucas_Sartorelli', 
        // email: 'lucas@tg.com',
        user: {}
    });

    const imgProfile = (state.user.userImageURL) ? state.user.userImageURL : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"

    function changeOpen() {
        setState({ ...state, open: !state.open });
    }

    useEffect(() => {
        axios({
            url: 'https://archetypeofficial.herokuapp.com/graphql',
            method: 'post',
            data: {
                query: `
                    {
                        user (_id: "5f90b438479f72000449440d") {
                        id
                        nickname
                        username
                        userExp
                        userLevel
                        userPermission
                        userRanking
                        userPosts
                        userComments
                        userReports
                        userImageURL
                        }
                    }
                `
            }
        }).then((resultUsers) => {
            // console.log(resultUsers);
            setState({ ...state, user: resultUsers.data.data.user});
        });
    }, []);

    return (
        <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
                <li onMouseLeave={() => changeOpen()} className={`dropdown user user-menu ${state.open ? 'open' : ''}`}>
                    <a style={{"cursor": "pointer"}} onClick={() => changeOpen()}
                        aria-expanded={state.open ? 'true' : 'false'}
                        className="dropdown-toggle"
                        data-toggle="dropdown">
                        <img src={imgProfile} className="user-image" alt="User Image" />
                        <span>&nbsp;{state.user.nickname}</span><span>&nbsp;&nbsp;</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li className="user-header">
                            <img src={imgProfile} className="img-circle" alt="User Image"></img>
                            <p>{state.user.nickname} - {state.user.userRanking}<small>{state.user.username}</small></p>
                        </li>
                        <li className="user-footer">
                            {/* <div className="pull-left">
                                <a href="#" className="btn btn-default btn-flat">Profile</a>
                            </div> */}
                            <div className="pull-right">
                                <a href="#" className="btn btn-default btn-flat">Sair da conta</a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
