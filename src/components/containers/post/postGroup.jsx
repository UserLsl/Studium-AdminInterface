import React from "react";

import imgDefault from '../../../resources/images/imgDefault.jpg';

import Grid from '../../common/layout/grid';
import Row from '../../common/layout/row';
import Card from './postCard';

export default (props) => {
    return (
        <span>
            <div id="div-style" className="box-body">
                <Row>
                    <Grid cols="0 0 1 3" />
                    <Grid cols="12 12 10 6">
                        <div className="form-group input-group div-center-style">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
                            {/* <button type="submit" id="" className={`btn btn-default`}><span className="fa fa-search"></span></button> */}
                            <input name="search" id="search" placeholder="Consultar" type="text" className="form-control"></input>
                        </div>
                    </Grid>
                    <Grid cols="0 0 1 3" />
                </Row>
            </div>
            <fieldset>
                <div id="div-style"><legend>Últimas Postagens</legend></div>
                <div className="flex-container">
                    {props.data.map(post =>
                        <div key={post.id}>
                            <Card post={post} title={post.postTitle} action={props.action} user={post.author} date="18 February 2015" img={post.postImageURL ? post.postImageURL : imgDefault} />
                        </div>
                    )}
                </div>
            </fieldset>
        </span>
    );
}
