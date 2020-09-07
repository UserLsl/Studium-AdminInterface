import React from 'react';

export default props => {

    const selected = props.selected === props.target;
    console.log(selected + props.target);
    // const visible = this.props.tab.visible[this.props.target];

    // if (visible) {
    return (
        <li className={selected ? 'active' : ''}>
        {/* <li className={'active'}> */}
            <a href="javascript:;" data-toggle="tab" data-target={props.target} onClick={() => props.update(props.target)}>
                <i className={`fa fa-${props.icon}`}></i> {props.label}
            </a>
        </li>
    );
    // } else { return false; }

}