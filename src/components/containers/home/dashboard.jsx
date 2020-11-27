import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Content from '../../template/content';
import ValueBox from '../../common/widget/valueBox';
import Row from '../../common/layout/row';
import Graph from './graph';


export default () => {

    const [state, setState] = useState({
        categories: [],
        users: [],
        posts: [],
        reports: [],
        summationPosts: [],
        // usersExp: 0,
        // highestScorer: 'none',
        // highScore: 0,
        loading: true
    });

    const [usersLikes, setUsersLikes] = useState([]);

    console.log(usersLikes);

    function getUsersExp() {
        if (usersLikes) {
            let counter = 0;

            usersLikes.map(like => {
                counter += like[0];
            });
            return counter * 20;
        } else {
            return 0;
        }
    }

    function getHighestScorer() {
        if (usersLikes) {
            let highScore = 0;
            let highestScorer = 'none';

            usersLikes.map(like => {
                if (like[0] > highScore) {
                    highScore = like[0];
                    highestScorer = like[1];
                }
            });
            return [highestScorer, highScore * 20];
        } else {
            return ['none', 0];
        }
    }

    function getReportsSolved() {
        let count = 0;
        state.reports.map(report => {
            if (report.solved) {
                count++;
            }
        });
        return count;
    }

    function getExp(userId, userIndex, userLength) {
        axios({
            url: 'https://archetypeofficial.herokuapp.com/graphql',
            method: 'post',
            data: {
                query: `
                    {
                        user (_id: "${userId}") {
                          id
                          nickname
                          username
                          userExp
                          userLevel
                          userPermission
                          userRanking
                          userPosts
                          userComments
                          userReports
                          userImageURL
                        }
                    }
            `
            }
        }).then((resultUsers) => {
            console.log(resultUsers.data.data);
            if (resultUsers) {

                const myPromise = new Promise((resolve, reject) => {
                    let counter = 0;
                    // let posts = [];
                    let data = 0;

                    console.log('resolvendo...');

                    if (resultUsers.data.data.user.userPosts.length > 0) {
                        resultUsers.data.data.user.userPosts.map((postId) => {
                            axios({
                                url: 'https://archetypeofficial.herokuapp.com/graphql',
                                method: 'post',
                                data: {
                                    query: `
                                        {
                                            post(_id: "${postId}") {
                                                id
                                                postTitle
                                                likedBy
                                            }
                                        }
                                    `
                                }
                            }).then((resultPost) => {
                                counter++;
                                // console.log(counter)
                                data += resultPost.data.data.post.likedBy.length;
                                console.log('index: ' + counter + ' qtde: ' + resultPost.data.data.post.likedBy.length);

                                if (counter == resultUsers.data.data.user.userPosts.length) {
                                    resolve(data);
                                }

                                // posts.push({ id: resultPost.data.data.post.id, postTitle: resultPost.data.data.post.postTitle })
                            }).catch(err => {
                                reject(new Error('In 10% of the cases, I fail. Miserably.'));
                            });
                        });
                    } else {
                        reject(new Error('Esse usuário não possui postagens'));
                    }

                });

                // Same as above, written concisely
                myPromise.then((resolvedValue) => {
                    let temp = [];

                    console.log('resolvido: ' + resultUsers.data.data.user.nickname)
                    console.log(resolvedValue);

                    temp = usersLikes;
                    temp.push([resolvedValue, resultUsers.data.data.user.nickname]);

                    console.log('usuário: ' + userIndex + ' total: ' + userLength);

                    if (userIndex == userLength) {
                        console.log(temp);
                        setUsersLikes(temp);
                    }

                }, (error) => {
                    console.log(error);
                });

            }
        });
    }


    useEffect(() => {
        axios({
            url: 'https://archetypeofficial.herokuapp.com/graphql',
            method: 'post',
            data: {
                query: `
                    { 
                        categories {
                            id
                            categoryPosts
                            categoryTitle
                        }
                    }
                `
            }
        }).then((resultCategories) => {
            axios({
                url: 'https://archetypeofficial.herokuapp.com/graphql',
                method: 'post',
                data: {
                    query: `
                        {
                            users {
                            id
                            nickname
                            username
                            userExp
                            userLevel
                            userPermission
                            userRanking
                            userPosts
                            userComments
                            userReports
                            }
                        }
                    `
                }
            }).then((resultUsers) => {
                let usersExp = 0;
                let highScore = 0;
                let highestScorer = '';

                let index = 0;
                let validUsers = [];

                resultUsers.data.data.users.map(user => {
                    if (user.userPosts.length > 0) {
                        validUsers.push(user);
                    }
                });
                validUsers.map(user => {

                    // let lel = getExp(user.id);
                    // console.log(lel)

                    // if (lel > 0) {
                    //     usersExp += lel;
                    //     if (lel > highScore) {
                    //         highScore = lel;
                    //         highestScorer = user.nickname;
                    //     }
                    // }
                    index++;
                    if (user.userPosts.length > 0) {
                        getExp(user.id, index, validUsers.length);
                    }

                });
                axios({
                    url: 'https://archetypeofficial.herokuapp.com/graphql',
                    method: 'post',
                    data: {
                        query: `
                            {
                                posts (
                                pageSize: 10000,
                                ) {
                                hasMore
                                cursor
                                posts {
                                    id
                                    author
                                    postTitle
                                    postBody
                                    cursor
                                    postImageURL
                                    createdAt
                                    categoryId
                                    postTags
                                    createdAt
                                }
                                }
                            }
                        `
                    }
                }).then((resultPosts) => {

                    const summationPosts = { mes0: [0], mes1: 0, mes2: 0, mes3: 0, mes4: 0, mes5: 0 }

                    resultPosts.data.data.posts.posts.map(post => {
                        // console.log(new Date(post.createdAt).getDate() + '/' + new Date(post.createdAt).getMonth() + '/' + new Date(post.createdAt).getFullYear());
                        if (new Date(post.createdAt).getMonth() == new Date().getMonth()) {
                            summationPosts.mes0++;
                        } else if (new Date(post.createdAt).getMonth() == new Date().getMonth() - 1) {
                            summationPosts.mes1++;
                        } else if (new Date(post.createdAt).getMonth() == new Date().getMonth() - 2) {
                            summationPosts.mes2++;
                        } else if (new Date(post.createdAt).getMonth() == new Date().getMonth() - 3) {
                            summationPosts.mes3++;
                        } else if (new Date(post.createdAt).getMonth() == new Date().getMonth() - 4) {
                            summationPosts.mes4++;
                        } else if (new Date(post.createdAt).getMonth() == new Date().getMonth() - 5) {
                            summationPosts.mes5++;
                        }
                    });

                    axios({
                        url: 'https://archetypeofficial.herokuapp.com/graphql',
                        method: 'post',
                        data: {
                            query: `
                            { 
                                reports {
                                    id
                                    postId
                                    commentId
                                    userId
                                    reportTitle
                                    reportBody
                                    solved
                                }
                            }
                            `
                        }
                    }).then((resultReports) => {
                        setState({
                            categories: resultCategories.data.data.categories,
                            users: resultUsers.data.data.users,
                            // usersExp,
                            // highestScorer,
                            // highScore,
                            posts: resultPosts.data.data.posts,
                            reports: resultReports.data.data.reports,
                            summationPosts: summationPosts,
                            loading: false
                        });
                    });
                });
            });
        });
    }, []);

    if (state.loading) {
        return (
            <div className="container-load">
                <div className="load style"> <i className="fa fa-cog fa-spin fa-5x fa-fw"></i><span className="sr-only">Loading...</span> </div>
            </div>
        );
    } else if (!state.loading) {
        return (
            <Content title="Dashboard" small="Versão 1.0">
                <Graph reports={state.reports} categories={state.categories} users={state.users} summation={state.summationPosts} />
                <Row>
                    {/* <ValueBox cols="12 12 4 4" color="green" icon="users" value={135} text="Total de Usuários logados" /> */}
                    <ValueBox cols="12 12 4 4" color="green" icon="user-plus" value={state.users.length} text="Total de Usuários cadastrados" />
                    <ValueBox cols="12 12 4 4" color="red" icon="comments" value={state.reports.length - getReportsSolved()} text="Total de Denúncias em aberto" />
                    <ValueBox cols="12 12 4 4" color="blue" icon="pencil-square-o" value={state.posts.posts.length} text="Total de postagens" />
                    <ValueBox cols="12 12 4 4" color="yellow" icon="folder" value={state.categories.length} text="Total de categorias cadastradas" />
                    {/* <ValueBox cols="12 12 4 4" color="purple" icon="star" value={state.usersExp} text="Total de Experiência dos Usuários" /> */}
                    <ValueBox cols="12 12 4 4" color="purple" icon="star" value={getUsersExp()} text="Total de Experiência dos Usuários" />
                    <ValueBox cols="12 12 4 4" color="maroon" icon="user-circle-o" value={getHighestScorer()[0]} text={"Usuário que mais pontuou: " + getHighestScorer()[1] + " pontos"} />

                    {/* <ValueBox cols="12 12 4 4" color="fuchsia" icon="star" value={2} text="Total 2 tentando" />
                    <ValueBox cols="12 12 4 4" color="teal" icon="user-circle-o" value={327} text={"3 pontos teste"} />
                    <ValueBox cols="12 12 4 4" color="olive" icon="folder" value={1598} text="Teste total 1" /> */}

                </Row>
            </Content>
        );
    }
}