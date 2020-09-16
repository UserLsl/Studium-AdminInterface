import React from 'react';

export default function table(props) {

    function renderRows() {
        return props.list.map((category, index) => {
            return (
                <tr key={index} id={index}>
                    <td>{index + 1}</td>
                    <td>{category.categoryTitle}</td>
                    <td>{category.categoryPosts.length}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => props.actionUpdate(true, 'update', category)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => props.actionDelete(category.id)}>
                            <i className="fa fa-trash-o"></i>
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
                            <td>Index</td>
                            <td>Descrição</td>
                            <td>Qtde de Posts</td>
                            <td>Ações</td>
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