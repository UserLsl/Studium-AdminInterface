import React, { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import axios from 'axios';
import Swal from 'sweetalert2';

import { GET_REPORTS, UPDATE_REPORTS } from '../../../queries/proceduresReport';
import { DELETE_POST } from '../../../queries/proceduresPots';

import Content from '../../template/content';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import List from './reportList';
import PostView from '../post/postView';


export default props => {

    const [state, setState] = useState({
        post: [],
        reportId: '',
        tabsVisible: { list: true },
        tabSelected: 'list'
    });

    const { loading, error, data, refetch } = useQuery(GET_REPORTS);
    const [deletePost] = useMutation(DELETE_POST);
    const [updateReport] = useMutation(UPDATE_REPORTS);

    refetch();

    if (!loading) {
        data.reports.map((report) => {
            if (report.postId != null && report.solved == false) {
                axios({
                    url: 'https://archetypeofficial.herokuapp.com/graphql',
                    method: 'post',
                    data: {
                        query: `
                            {
                                post (_id: "${report.postId}") {
                                    id
                                    postTitle
                                    author
                                    postBody
                                    postLikes
                                    userId
                                    categoryId
                                    postStatus
                                    postVisibility
                                    postImageURL
                                }
                            }
                        `
                    }
                }).then((result) => {
                    if (!result.data.data.post) {
                        axios({
                            url: 'https://archetypeofficial.herokuapp.com/graphql',
                            method: 'post',
                            data: {
                                query: `
                                    mutation {
                                        updateReport (
                                            _id: "${report.id}",
                                            solved: ${true},
                                        ), {
                                            id
                                        }
                                    }
                                `
                            }
                        });
                        refetch();
                    }
                })
            }
        });
    }

    function renderTabSelected(visible, target) {
        console.log('estou no render tab selected - teste Id: ' + state.reportId);
        setState({ ...state, tabsVisible: { list: visible, view: !visible }, tabSelected: target });
    }

    function tabViewWillMount(visible, target, postId, reportId) {
        console.log('passei- postId: ' + postId + ' = ' + state.post.id);
        if (postId != state.post.id) {
            // console.log('entrei');
            axios({
                url: 'https://archetypeofficial.herokuapp.com/graphql',
                method: 'post',
                data: {
                    query: `
                        {
                            post (_id: "${postId}") {
                                id
                                postTitle
                                author
                                postBody
                                postLikes
                                userId
                                categoryId
                                postStatus
                                postVisibility
                                postImageURL
                            }
                        }
                    `
                }
            }).then((result) => {
                if (result.data.data.post) {
                    setState({ ...state, post: result.data.data.post, reportId, tabsVisible: { list: visible, view: !visible }, tabSelected: target });
                    console.log('Retorno');
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'A postagem ligada a está denúncia não existe mais!',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    setState({...state});
                }
            }).catch(err => {
                console.log(err.response);
            });
        } else {
            console.log('Again');
            renderTabSelected(visible, target);
        }

    }

    function actionDeletePost(id) {
        console.log('estou em actionDelete: ' + state.reportId)

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
                deletePost({ variables: { id } });
                actionUpdateSolved(state.reportId, false, id);
                renderTabSelected(true, 'list');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Postagem excluída com sucesso!',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }

    function actionUpdateSolved(reportId, check, postId) {

        if (check) {
            Swal.fire({
                title: 'Você tem certeza?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#008a1d',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Resolver'
            }).then((result) => {
                if (result.isConfirmed) {
                    updateReport({ variables: { id: reportId, solved: true } });
                    verifyMatchingReports(postId);
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Denúncia resolvida!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
        } else {
            updateReport({ variables: { id: reportId, solved: true } });
            verifyMatchingReports(postId);
            refetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Denúncia resolvida!',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    function verifyMatchingReports(postId) {
        if (data) {
            data.reports.map((report) => {
                if (report.postId == postId && report.solved == false) {
                    console.log(report);
                    // updateReport({ variables: { id: report.id, solved: true } });
                    axios({
                        url: 'https://archetypeofficial.herokuapp.com/graphql',
                        method: 'post',
                        data: {
                            query: `
                                mutation {
                                    updateReport (
                                        _id: "${report.id}",
                                        solved: ${true},
                                    ), {
                                        id
                                    }
                                }
                            `
                        }
                    });
                }
            });
        }
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
                <Content title="Postagens" small="Denúncias">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <TabHeader label="Listar" icon="bars" target="list" selected={state.tabSelected} visible={state.tabsVisible.list} />
                            <TabHeader label="Visualizar" icon="newspaper-o" target="view" selected={state.tabSelected} visible={state.tabsVisible.view} />
                        </ul>
                        <ul className="tab-content">
                            <TabContent id='list' selected={state.tabSelected}>
                                <List list={data.reports} tableName='Lista de Postagens Denúnciadas' actionView={tabViewWillMount} actionDone={actionUpdateSolved} type='posts' />
                            </TabContent>
                            <TabContent id='view' selected={state.tabSelected}>
                                <PostView title={state.post.postTitle} image={state.post.postImageURL} post={state.post} onDeleted={actionDeletePost} onBack={renderTabSelected} />
                            </TabContent>
                        </ul>
                    </div>
                </Content>
            </div>
        );
    }
}