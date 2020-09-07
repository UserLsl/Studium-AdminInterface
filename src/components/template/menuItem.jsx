import React from 'react';

export default props => {
    return (
        <li>
            {/* <Link to={props.path}> */}
            <a href={props.path}>
                <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
            </a>
            {/* </Link> */}
        </li>
    );
}
