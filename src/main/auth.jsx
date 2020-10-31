import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import imgLogo from '../resources/images/logo.jpg';
import '../resources/styles/auth.css';

export default props => {

    const [state, setState] = useState({
        email: '',
        pass: '',
        error: '',
        loading: true
    });

    useEffect(() => {
        axios.get('https://archetypeofficial.herokuapp.com/user', { withCredentials: true }
        ).then((userAuth) => {
            console.log(userAuth);
    
            if (userAuth.data != 'Incorrect username and password combination!') {
                axios({
                    url: 'https://archetypeofficial.herokuapp.com/graphql',
                    method: 'post',
                    data: {
                        query: `
                            { 
                                user ( _id: "${userAuth.data.user._id}" ) {
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
                }).then((userResult) => {
                    if (userResult.data.data.user.userPermission == 'ADMIN') {
                        props.changeState({ logged: true, user: userResult.data.data.user });
                    } else {
                        setState({ ...state, loading: false })
                    }
                });
            } else {
                setState({ ...state, loading: false })
            }
        });
    }, []);


    function validateUser(e) {
        e.preventDefault();
        axios.get(
            // `https://archetypeofficial.herokuapp.com/login?username=${state.email}&password=${state.pass}`
            `https://archetypeofficial.herokuapp.com/login?username=${state.email}&password=${state.pass}`, { withCredentials: true }
            // `https://archetypeofficial.herokuapp.com/login?username=lucas.leinatti%40fatec.sp.gov.br&password=3210`, { withCredentials: true }
        ).then((result) => {
            console.log(result)
            if (result.data == 'Helloooooo!') {

                axios.get('https://archetypeofficial.herokuapp.com/user', { withCredentials: true }
                ).then((userAuth) => {
                    console.log(userAuth);
                    // if (userResult.data.user.userPermission = "ADMIN")

                    axios({
                        url: 'https://archetypeofficial.herokuapp.com/graphql',
                        method: 'post',
                        data: {
                            query: `
                                { 
                                    user ( _id: "${userAuth.data.user._id}" ) {
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
                    }).then((userResult) => {
                        if (userResult.data.data.user.userPermission == 'ADMIN') {
                            props.changeState({ logged: true, user: userResult.data.data.user });
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Usuário sem permissão adequada!',
                                showConfirmButton: false,
                                timer: 2000
                            });
                            setState({ ...state, error: 'Somente usuários administradores podem acessar!' });
                        }
                    });

                });

            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Endereço de Email ou Senha inválidos!',
                    showConfirmButton: false,
                    timer: 2000
                });
                setState({ ...state, error: 'O email ou a senha fornecidos não correspondem!' });

            }
        }).catch(err => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Endereço de Email ou Senha inválidos!',
                showConfirmButton: false,
                timer: 2000
            });
            setState({ ...state, error: 'O email ou a senha fornecidos não correspondem!' });
        });
    };


    if (state.loading) {
        return (
            <div className="container-load">
                <div className="load style"> <i className="fa fa-cog fa-spin fa-5x fa-fw"></i><span className="sr-only">Loading...</span> </div>
            </div>
        );
    } else if (!state.loading) {
        return (
            <div className="container">
                <div className="cardAuth-style card-container">
                    <img id="profile-img" className="img-card-style" src={imgLogo} />
                    <p id="profile-name" className="name-card-style">Studium</p>
                    <p className="subName-card-style">ADMIN</p>
                    < br />
                    <form className="form-signin" onSubmit={e => validateUser(e)}>
                        <span id="reauth-email" className="reauth-email" style={{ "color": "red" }}>{state.error}</span>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Endereço de Email" autoComplete="username" required
                            value={state.email} onChange={e => setState({ ...state, email: e.target.value })}
                        ></input>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Senha" autoComplete="current-password" required
                            value={state.pass} onChange={e => setState({ ...state, pass: e.target.value })}
                        ></input>
                        <button className="btn btn-primary btn-block btn-flat" type="submit" style={{ "marginLeft": 0 }}>Entrar</button>
                    </form>
                    {/* <a href="#" className="forgot-password">Esqueceu sua senha?</a> */}
                </div>
            </div>
        );
    }

}