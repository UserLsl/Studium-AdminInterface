import React from 'react';

export default props => {
    return (
        <div>
            <section className="content-header">
                <h1>{props.title} 
                    <small>{props.small}</small>
                </h1>
            </section>
            <section className="content">
                {props.children}
            </section>
        </div>
    );
}

