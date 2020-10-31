import React from 'react';

export default function table(props) {

    function renderRows() {
        return props.list.map((report, index) => {
            if(props.type == 'posts') {
                if(report.postId != null && report.solved == false) {
                    return (
                        <tr key={index} id={index}>
                            <td>{report.reportTitle}</td>
                            <td>{report.reportBody}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => props.actionView(false, 'view', report.postId, report.id)}>
                                    <i className="fa fa-newspaper-o"></i>
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => props.actionDone(report.id, true, report.postId)}>
                                    <i className="fa fa-check"></i>
                                </button>
                            </td>
                        </tr>
                    );
                }
            } else if(props.type == 'comments') {
                if(report.commentId != null && report.solved == false) {
                    return (
                        <tr key={index} id={index}>
                            <td>{report.reportTitle}</td>
                            <td>{report.reportBody}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => props.actionView(false, 'view', report.commentId, report.id)}>
                                    <i className="fa fa-newspaper-o"></i>
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => props.actionDone(report.id, true, report.commentId)}>
                                    <i className="fa fa-check"></i>
                                </button>
                            </td>
                        </tr>
                    );
                }
            }
        });
    }

    return (
        <div className="box-body table-responsive">
            <fieldset>
                <legend>{props.tableName}</legend>
                <table className="table">
                    <thead>
                        <tr key="thead">
                            <td>Assunto</td>
                            <td>Descrição</td>
                            <td>Visualizar</td>
                            <td>Feito</td>
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