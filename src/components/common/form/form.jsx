import React, { useEffect } from 'react';

import Row from '../layout/row';

export default props => {

    return (
        <div id="div-style" className="box-body">
            {/* <form onSubmit={() => props.action} role="form"> */}
            <fieldset>
                <legend>{props.formName}</legend>
                <Row>
                    {props.children}
                </Row>
            </fieldset>
            {/* </form> */}
        </div>
    );
}
