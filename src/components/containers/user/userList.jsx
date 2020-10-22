import React from 'react';

export default function table(props) {

    function renderRows() {
        return props.list.map((user, index) => {
            return (
                <tr key={user.id} id={index}>
                    <td>{user.nickname}</td>
                    <td>{user.username}</td>
                    <td>{user.userLevel}</td>
                    <td>{user.userPermission}</td>
                    <td>
                        <button type="submit" className={`btn btn-warning`} onClick={() => props.setForm(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="box-body table-responsive">
            <fieldset>
                <legend>{props.tableName}</legend>
                <table className="table">
                    <thead>
                        <tr key="thead">
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