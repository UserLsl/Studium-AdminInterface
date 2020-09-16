import React, { useEffect } from 'react';

import Row from '../layout/row';

export default props => {

    return (
        <div id="div-style" className="box-body">
            {/* <form onSubmit={() => props.action} role="form"> */}
            <fieldset>
                <legend>{props.formName}</legend>
                <Row>
                    {props.children}
                </Row>
            </fieldset>
            {/* </form> */}
        </div>
    );
}


//  <Grid cols="12 6 3">
//     <label className="label-form-style" for="name">Nome:</label> 
//     <input type="text" id="name" name="name" className="form-control" disabled={true} value={props.user.userName} />
// </Grid>
// <Grid cols="12 6 3">
//     <label className="label-form-style" for="email">E-mail:</label>
//     <input type="text" id="email" name="email" className="form-control" disabled={true} value={props.user.userEmail} />
// </Grid>
// <Grid cols="12 6 2">
//     <label className="label-form-style" for="level">Nível:</label>
//     <input type="text" id="level" name="level" className="form-control" disabled={true} value={props.user.userLevel} />
// </Grid>
// <Grid cols="12 6 2">
//     <label className="label-form-style" for="permission">Permissão:</label>
//     <select className="form-control" id="permission">
//         <option value="STANDARD">Padrão</option>
//         <option value="MOD">Moderador</option>
//         <option value="ADMIN">Administrador</option>
//     </select>
// </Grid>
// <Grid cols="12 12 2">
//     <button type="submit" id="button-form-style" className={`btn btn-success`} onClick={() => props.update(props.user.id, document.getElementById('permission').value)}>Atualizar</button>
// </Grid>