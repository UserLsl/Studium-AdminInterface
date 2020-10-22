import React from "react";

export default (props) => {
    return (
        <div className="box gallery">
            <div className="card">
                <div className="background">
                    <a href="#" className="overlay-background"></a>
                    <img src={props.img}
                        alt={props.title}>
                    </img>
                </div>
                <a className="overlay" onClick={() => props.action(true, 'view', props.post)}></a>
                <a className="user"><i className="fa fa-user"></i><span> {props.user}</span></a>
                <a className="thumb" href="#"></a>
                <div className="info">
                    <h2><a href="#">{props.title}</a></h2>
                    <div className="foot">
                        <i className="line"></i>
                        <span className="date">{props.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}