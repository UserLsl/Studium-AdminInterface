import React from 'react';

import Grid from '../layout/grid';

export default props => {

    if (props.setState) {
        return (
            <Grid cols={props.cols}>
                <label className="label-form-style" htmlFor={props.name}>{props.text}</label>
                <input type={props.type} id={props.name} name={props.name} className="form-control" disabled={props.disabled}
                    value={props.state.categoryTitle !== undefined ? props.state.categoryTitle : ''}
                    onChange={e => props.setState({ ...props.state, categoryTitle: e.target.value })}
                />
            </Grid>
        );
    } else {
        return (
            <Grid cols={props.cols}>
                <label className="label-form-style" htmlFor={props.name}>{props.text}</label>
                <input type={props.type} id={props.name} name={props.name} className="form-control" disabled={props.disabled} value={props.value} />
            </Grid>
        );
    }

}