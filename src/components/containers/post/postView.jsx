import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import Grid from '../../common/layout/grid';
import Row from '../../common/layout/row';

export default props => {
    return (
        <div className="box-body box-style">
            <fieldset>
                <Row><div id="div-style"><legend>{props.post.postTitle}</legend></div></Row>
                <Row>
                    <Grid cols="12 6 2 2">
                        {/* <div class="mobile-hide"></div> */}
                        <div className="mobile">
                            <div className="desktop-hide">
                                <button className={`btn btn-primary`} onClick={() => props.onBack(true, 'list')}>Voltar para lista de Postagens</button>
                            </div>
                        </div>
                    </Grid>
                </Row>
                <Row>
                    <div>
                        <Grid cols="0 0 0 1" />
                        <Grid cols="12 12 7 7">
                            <div className="div-padding-style">
                                <div className="box-header-style">
                                    {/* <div className="box-header">
                                                                <h3 className="box-title">teste</h3>
                                                            </div> */}
                                    <span><div className="box-body">
                                    {props.post.createdAt} | {props.post.author} | {props.post.categoryId} | {props.post.postTags}
                                    </div></span>
                                </div>
                            </div>

                            <div className="div-padding-style">
                                <div className="box-body-style">
                                    {ReactHtmlParser(props.post.postBody)}
                                </div>
                            </div>
                        </Grid>

                        <Grid cols="12 12 5 2">
                            <div className="div-padding-style div-fixed-style">
                                <div className="box-body-style">
                                    <div className="card">
                                        <div className="div-padding-style gallery">
                                            <div className="card">
                                                <div className="background-style">
                                                    <img src={props.post.postImageURL}
                                                        alt={props.post.postTitle}>
                                                    </img>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <a className="btn btn-primary btn-card-style" onClick={() => props.onBack(true, 'list')}>Voltar</a>
                                                <a className="btn btn-danger btn-card-style" onClick={() => props.onDeleted(props.post.id)}>Deletar</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid cols="0 0 0 2" />
                    </div>
                </Row>
                <Row>
                    <Grid cols="12 6 2 2">
                        {/* <div class="mobile-hide"></div> */}
                        <div className="mobile">
                            <div className="desktop-hide">
                                <button type="submit" className={`btn btn-danger`} onClick={() => props.onDeleted(props.post.id)}>Apagar Postagem</button>
                            </div>
                        </div>
                    </Grid>
                </Row>
            </fieldset>
        </div>
    );
}