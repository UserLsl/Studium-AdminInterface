import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import imgLogo from '../resources/images/logo.jpg';
import '../resources/styles/auth.css';

export default props => {

    const [state, setState] = useState({
        email: '',
        pass: '',
        error: ''
    });

    function validateUser() {
        // e.preventDefault();
        axios.get(
            // `https://archetypeofficial.herokuapp.com/login?username=${state.email}&password=${state.pass}`
            // `https://archetypeofficial.herokuapp.com/login?username=${state.email}&password=${state.pass}`, { withCredentials: true }
            `https://archetypeofficial.herokuapp.com/login?username=lucas.leinatti%40fatec.sp.gov.br&password=3210`, { withCredentials: true }
        )
        .then((result) => {
            console.log(result)
            // if (result.data == 'Helloooooo!') {
            //     // props.changeState({ logged: true });
            // } else {
            //     Swal.fire({
            //         position: 'top-end',
            //         icon: 'error',
            //         title: 'Endereço de E-mail ou Senha inválidos!',
            //         showConfirmButton: false,
            //         timer: 2000
            //     });
            //     setState({ ...state, error: 'O email ou a senha fornecidos não correspondem!' });
            // }
        })
        // .catch(err => {
        //     Swal.fire({
        //         position: 'top-end',
        //         icon: 'error',
        //         title: 'Endereço de E-mail ou Senha inválidos!',
        //         showConfirmButton: false,
        //         timer: 2000
        //     });
        //     setState({ ...state, error: 'O email ou a senha fornecidos não correspondem!' });
        // });
    }

    return (
        <div className="container">
            <div className="cardAuth-style card-container">
                <img id="profile-img" className="img-card-style" src={imgLogo} />
                <p id="profile-name" className="name-card-style">Studium</p>
                <p className="subName-card-style">ADMIN</p>
                < br />
                <form className="form-signin" onSubmit={e => validateUser(e)}>
                    <span id="reauth-email" className="reauth-email" style={{ "color": "red" }}>{state.error}</span>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Endereço de Email" autoComplete="username"
                        value={state.email} onChange={e => setState({ ...state, email: e.target.value })}
                    ></input>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Senha" autoComplete="current-password"
                        value={state.pass} onChange={e => setState({ ...state, pass: e.target.value })}
                    ></input>
                    <button className="btn btn-primary btn-block btn-flat" type="submit" style={{ "marginLeft": 0 }}>Entrar</button>
                </form>
                {/* <a href="#" className="forgot-password">Esqueceu sua senha?</a> */}
            </div>
            <button className="btn btn-primary btn-block btn-flat" type="submit" style={{ "marginLeft": 0 }}
                onClick={() => validateUser()}
            >Teste</button>
        </div>
    );
}

// class Auth extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { loginMode: true }
//     }
//     changeMode() {
//         this.setState({ loginMode: !this.state.loginMode })
//     }
//     onSubmit(values) {
//         const { login, signup } = this.props
//         this.state.loginMode ? login(values) : signup(values)
//     }
//     render() {
//         const { loginMode } = this.state
//         const { handleSubmit } = this.props
//         return (
//             <div className="container">
//                 <div className="cardAuth-style card-container">
//                     {/* <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/> */}
//                     <img id="profile-img" className="img-card-style" src={imgLogo} />
//                     <p id="profile-name" className="name-card-style">Studium</p>
//                     <p className="subName-card-style">ADMIN</p>
//                     < br />
//                     <form class="form-signin">
//                         <span id="reauth-email" className="reauth-email"></span>
//                         <input type="email" id="inputEmail" className="form-control" placeholder="Endereço de Email"></input>
//                         <input type="password" id="inputPassword" className="form-control" placeholder="Senha"></input>
//                         <button className="btn btn-primary btn-block btn-flat" type="submit" style={{ "margin-left": 0 }}>Entrar</button>
//                     </form>
//                     <a href="#" className="forgot-password">Esqueceu sua senha?</a>
//                 </div>
//             </div>
//         );
//     }
// }

// export default (Auth);