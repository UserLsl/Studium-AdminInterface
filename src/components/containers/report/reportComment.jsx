// Importando dependências
import React, { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import axios from 'axios';
import Swal from 'sweetalert2';

// Importando queries
import { GET_REPORTS, UPDATE_REPORTS } from '../../../queries/proceduresReport';

// Importando componentes
import Content from '../../template/content';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import List from './reportList';


export default props => {

    // Declarando o estado do componente
    const [state, setState] = useState({
        reportId: '',
        commentId: '',
        reportBody: '',
        tabsVisible: { list: true },
        tabSelected: 'list'
    });

    // Declarando requisições graphql
    const { loading, error, data, refetch } = useQuery(GET_REPORTS);
    const [updateReport] = useMutation(UPDATE_REPORTS);

    // Refazendo requisições graphql
    refetch();

    // Verificando se existem denúncias em aberto que possuem comentários que já foram excluídos
    // Caso haja, as mesmas são marcadas como resolvidas 
    if (!loading) {
        data.reports.map((report) => {
            if (report.commentId != null && report.solved == false) {
                axios({
                    url: 'https://archetypeofficial.herokuapp.com/graphql',
                    method: 'post',
                    data: {
                        query: `
                            {
                                comment (_id: "${report.commentId}") {
                                    id
                                    userId
                                    commentBody
                                }
                            }
                        `
                    }
                }).then((result) => {
                    if (!result.data.data.comment) {
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

    // Gerenciando as tabs listar e visualizar da tela
    function renderTabSelected(visible, target) {
        setState({ ...state, tabsVisible: { list: visible, view: !visible }, tabSelected: target });
    }

    // Aqui vou requisitar ao servidor os dados do comentário para mostrá-lo na aba visualizar
    function tabViewWillMount(visible, target, commentId, reportId) {
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
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'O comentário ligado a está denúncia não existe mais!',
                    showConfirmButton: false,
                    timer: 2500
                });
                setState({...state});
            }
        }).catch(err => {
            console.log(err.response);
        });
    }

    // Função responsável por deletar um comentário
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
                        renderTabSelected(true, 'list');
                        actionUpdateSolved(state.reportId, false, id);
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

    // Função responsável por atualizar o status da denúncia para resolvido
    function actionUpdateSolved(reportId, check, commentId) {
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
                    verifyMatchingReports(commentId);
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
            verifyMatchingReports(commentId);
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

    // Verificando se existe mais alguma denúncia em aberto com o mesmo comentário passado por parâmetro
    function verifyMatchingReports(commentId) {
        if (data) {
            data.reports.map((report) => {
                if (report.commentId == commentId && report.solved == false) {
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

    // Verificando se houve algum erro com a requisição graphql
    if (error) throw new error();

    // Se a requisição graphql ainda não estiver completa é mostrado em tela o loading
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