import React from 'react';

export default props => {

    const selected = props.selected === props.target;
    //console.log(selected + props.target);

    if (props.visible) {
        return (
            <li className={selected ? 'active tab-style' : 'tab-style'}>
                {/* <li className={'active'}> */}
                <a data-toggle="tab" data-target={props.target} onClick={() => props.update(props.target)}>
                    <i className={`fa fa-${props.icon}`}></i> {props.label}
                </a>
            </li>
        );
    } else { return false; }

}