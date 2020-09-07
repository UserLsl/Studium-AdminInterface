import React from 'react';

import Grid from '../layout/grid';

export default props => {

    function renderRows() {
        const list = this.props.list || [];
        return list.map((item, index) => (
            <tr key={index}>
                
            </tr>
        ));
    }

    return (
        <Grid cols={this.props.cols}>
            <fieldset>
                <legend>{this.props.legend}</legend>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Permissão</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </fieldset>
        </Grid>
    );
}