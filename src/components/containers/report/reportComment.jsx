import React, { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import axios from 'axios';

import { GET_REPORTS, UPDATE_REPORTS } from '../../../queries/proceduresReport';

import Content from '../../template/content';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import List from './reportList';

export default props => {

    const [state, setState] = useState({
        reportId: '',
        commentId: '',
        reportBody: '',
        tabsVisible: { list: true },
        tabSelected: 'list'
    });

    const { loading, error, data, refetch } = useQuery(GET_REPORTS);
    const [updateReport] = useMutation(UPDATE_REPORTS);

    function renderTabSelected(visible, target) {
        console.log('estou no render renderTabSelected');
        setState({ ...state, tabsVisible: { list: visible, view: !visible }, tabSelected: target });
    }

    function tabViewWillMount(visible, target, commentId, reportId) {
        console.log('Aqui vou requisitar ao servidor os dados do comentário');

        axios({
            url: 'https://archetypeofficial.herokuapp.com/graphql',
            method: 'post',
            data: {
                query: `
                    {
                        comment (_id: "${commentId}") {
                            id
                            userId
                            commentBody
                        }
                    }
                `
            }
        }).then((result) => {
            if (result.data.data.comment) {
                console.log('Retorno: ' + result.data.data.comment.commentBody);
                setState({ ...state, reportBody: result.data.data.comment.commentBody, reportId, commentId, tabsVisible: { list: visible, view: !visible }, tabSelected: target });
                // renderTabSelected(visible, target);
            } else {
                console.log('N tenho um comentário');
            }
        }).catch(err => {
            console.log(err.response);
        });
    }

    function actionDeleteComment(id) {
        console.log('Aqui vou apagar o comentário');

        Swal.fire({
            title: 'Você tem certeza?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Deletar'
        }).then((result) => {
            if (result.isConfirmed) {

                if (id != '') {
                    // console.log('entrei');
                    axios({
                        url: 'https://archetypeofficial.herokuapp.com/graphql',
                        method: 'post',
                        data: {
                            query: `
                                mutation {
                                    deleteComment (
                                        _id: "${id}"
                                    ), {
                                        id
                                    }
                                }
                            `
                        }
                    }).then((result) => {
                        console.log('Retorno: ' + result);
                        // setState({...state, reportBody: result.data.data.comment.commentBody, reportId, commentId, tabsVisible: { list: visible, view: !visible }, tabSelected: target});
                        renderTabSelected(true, 'list');
                        actionUpdateSolved(state.reportId);
                    }).catch(err => {
                        console.log(err.response);
                    });
                }

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Comentário excluído com sucesso!',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });

    }

    function actionUpdateSolved(reportId) {
        console.log('feito!');
        updateReport({ variables: { id: reportId, solved: true } });
        refetch();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Denúncia resolvida!',
            showConfirmButton: false,
            timer: 2000
        });
    }

    if (error) throw new error();

    if (loading) {
        return (
            <div className="container-load">
                <div className="load style"> <i className="fa fa-cog fa-spin fa-5x fa-fw"></i><span className="sr-only">Loading...</span> </div>
            </div>
        );
    } else if (data) {
        console.log(data);
        console.log(state);
        return (
            <div>
                <Content title="Comentários" small="Denúncias">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <TabHeader label="Listar" icon="bars" target="list" selected={state.tabSelected} visible={state.tabsVisible.list} />
                            <TabHeader label="Visualizar" icon="newspaper-o" target="view" selected={state.tabSelected} visible={state.tabsVisible.view} />
                        </ul>
                        <ul className="tab-content">
                            <TabContent id='list' selected={state.tabSelected}>
                                <List list={data.reports} tableName='Lista de Comentários Denúnciados' actionView={tabViewWillMount} actionDone={actionUpdateSolved} type='comments' />
                            </TabContent>
                            <TabContent id='view' selected={state.tabSelected}>
                                {/* <PostView title={state.post.postTitle} image={state.post.postImageURL} post={state.post} onDeleted={actionDeletePost} onBack={renderTabSelected} /> */}
                                <p>{state.reportBody}</p>
                                <button className={`btn btn-default`} onClick={() => renderTabSelected(true, 'list')}>Voltar para a lista</button>
                                <button className={`btn btn-danger`} onClick={() => actionDeleteComment(state.commentId)}>Apagar Comentário</button>
                            </TabContent>
                        </ul>
                    </div>
                </Content>
            </div>
        );
    }
}