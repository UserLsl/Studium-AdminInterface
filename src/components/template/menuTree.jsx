import React, { useEffect } from 'react';

export default props => {

    useEffect(() => {
        if(props.menuTree != props.name) {
            document.getElementById(props.name).classList.remove("active-teste-style");
        }
    });

    function pullUpdate() {
        if(props.menuTree == '' || props.menuTree != props.name) {
            document.getElementById(props.name).classList.add("active-teste-style");
            props.setMenuTree(props.name);
        } else {
            document.getElementById(props.name).classList.remove("active-teste-style");
            props.setMenuTree('');
        }
    }

    return (
        <li className="treeview">
            <a style={{"cursor": "pointer"}} onClick={() => pullUpdate()}>
                <i className={`fa fa-${props.icon}`}></i> <span>{props.name}</span>
                <span className="pull-right-container">
                    <i id={props.name} className="fa fa-angle-left pull-right"></i>
                </span>
            </a>
            <ul className="treeview-menu">
                {props.children}
            </ul>
        </li>
    );
}