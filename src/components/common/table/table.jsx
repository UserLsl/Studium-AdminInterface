import React from 'react';

export default function table(props) {

    function renderRows() {
        return props.list.map(user => (
            <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.userLevel}</td>
                <td>{user.userPermission}</td>
                <td>
                    <button type="submit" className={`btn btn-success`} onClick={() => props.setForm(user)}>
                        Editar
                    </button>
                </td>
            </tr>
        ));
    }

    return (
        <div className="box-body">
            <fieldset>
                <legend>{props.tableName}</legend>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>E-mail</td>
                            <td>Nível</td>
                            <td>Permissão</td>
                            <td>Editar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            </fieldset>
        </div>

    );
}

