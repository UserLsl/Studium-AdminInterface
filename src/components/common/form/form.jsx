import React, { useEffect } from 'react';

export default props => {

    useEffect(() => {
        switch (props.user.userPermission) {
            case "ADMIN": document.getElementById('permission').value = 'ADMIN';
                break;
            case "MOD": document.getElementById('permission').value = 'MOD';
                break;
            case "STANDARD": document.getElementById('permission').value = 'STANDARD';
                break;
        }
    }, [props.user]);

    return (
        <form role="form">
            {/* <form onSubmit={} role="form"></form> */}
            <div className="box-body form-inline">
                <fieldset>
                    <legend>{props.formName}</legend>
                    <input className="form-control inputStyle" type="text" size="20" name="name" disabled="true" value={props.user.userName} />
                    <input className="form-control" type="text" size="40" name="email" disabled="true" value={props.user.userEmail} />
                    <input className="form-control" type="text" size="20" name="level" disabled="true" value={props.user.userLevel} />
                    <select className="form-control" id="permission">
                        <option value="STANDARD">Padrão</option>
                        <option value="MOD">Moderador</option>
                        <option value="ADMIN">Administrador</option>
                    </select>
                    <button type="submit" className={`btn btn-info`} onClick={() => props.update(props.user.id, document.getElementById('permission').value)} >Salvar</button>
                </fieldset>
            </div>
        </form>
    );
}

// 