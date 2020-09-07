import React from 'react';

export default props => {

    const selected = props.selected === props.id;
    // const visible = this.props.tab.visible[this.props.id];

    // if (visible) {
    return (
        <div id={props.id} className={`tab-pane ${selected ? 'active' : ''}`}>
        {/* <div id={props.id} className={`tab-pane active`}>  */}
            {props.children}
        </div>
    );
    // } else { return false; }
}