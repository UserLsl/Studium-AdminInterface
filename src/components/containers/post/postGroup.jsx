import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import imgDefault from '../../../resources/images/imgDefault.jpg';

import Grid from '../../common/layout/grid';
import Row from '../../common/layout/row';
import Card from './postCard';

export default (props) => {

    const [state, setState] = useState({
        filteredPosts: [],
        txtSearch: ''
    });

    const posts = (state.filteredPosts.length > 0) ? state.filteredPosts : props.data;

    useEffect(() => {
        document.addEventListener('keydown', function (event) {
            if (event.keyCode !== 13) return;
            searchPosts(document.getElementById('search').value);
        });
    }, []);

    function txtSearchChanged(event) {
        setState({ ...state, txtSearch: event.target.value });
    }

    function searchPosts(txtSearch) {
        // var searchWords = state.txtSearch.toUpperCase().split(' ');
        var searchWords = txtSearch.toUpperCase().split(' ');
        var grouping = [];
        var matchingPosts = [];
        var lastPostId = '';
        var selectedPosts = [];
        var ordenedPosts = [];
        var repeatedPost;
        var repeatedCount;
        var index = 0;

        // Pesquisa pela frase inteira da pesquisa

        props.data.map(post => {
            // console.log(state.txtSearch.toUpperCase() + ' = ' + post.postTitle.toUpperCase());
            // if (state.txtSearch.toUpperCase() == post.postTitle.toUpperCase()) {
            console.log(txtSearch.toUpperCase() + ' = ' + post.postTitle.toUpperCase());
            if (txtSearch.toUpperCase() == post.postTitle.toUpperCase()) {
                selectedPosts.push(post);
            }
        });

        // Se não achou a frase exata, Procura por fragmentos da pesquisa

        if (selectedPosts.length == 0) {
            props.data.map(post =>
                grouping.push({ postId: post.id, postTitle: post.postTitle, keyWord: post.postTitle.split(' ') })
            );

            searchWords.forEach(function (searchWord) {
                grouping.forEach(function (post) {
                    post.keyWord.forEach(function (titleWord) {
                        console.log(searchWord + ' = ' + titleWord.toUpperCase());
                        if (searchWord == titleWord.toUpperCase()) {
                            if (post.postId != lastPostId) {
                                lastPostId = post.postId;
                                matchingPosts.push([post.postId, post.postTitle]);
                            }
                        }
                    });
                });
            });

            props.data.map((post) => {
                repeatedCount = 1;

                matchingPosts.map((matchPost) => {
                    if (post.id == matchPost[0]) {

                        selectedPosts.map((selectPost) => {
                            console.log(selectPost.post.id + '=' + post.id)
                            if (selectPost.post.id == post.id) {
                                repeatedCount++;
                                repeatedPost = true;
                            } else if (repeatedPost == true) {
                                repeatedPost = true;
                            } else {
                                repeatedPost = false;
                                console.log('não sou repetido')
                            }
                        });

                        console.log(selectedPosts.length)
                        console.log(repeatedCount)

                        if (repeatedPost) {
                            console.log('apagar')
                            selectedPosts.splice(selectedPosts.length - 1, 1);
                        }

                        selectedPosts.push({ post, order: repeatedCount });

                        console.log(post)

                        repeatedPost = false;
                    }
                });
            });

            while (index < selectedPosts.length) {
                var higherNumber = [0, {}];
                var repeatedOrdenedPost;

                selectedPosts.map(post => {

                    ordenedPosts.map(ordenedPost => {
                        if (ordenedPost.id == post.post.id) {
                            repeatedOrdenedPost = true;
                        }
                    });

                    if (!repeatedOrdenedPost) {
                        if (higherNumber[0] == 0) higherNumber = [post.order, post.post];
                        if (post.order > higherNumber[0]) higherNumber = [post.order, post.post];
                    }

                    repeatedOrdenedPost = false;
                });

                ordenedPosts.push(higherNumber[1]);
                index++;
            }

        }

        console.log(selectedPosts)

        console.log(ordenedPosts)

        setState({ ...state, filteredPosts: ordenedPosts });

        if (ordenedPosts.length == 0 && txtSearch != '') {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Nenhuma publicação encontrada!',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    function getMonthWritten(number) {
        switch (number) {
            case 0: return 'Janeiro'
            case 1: return 'Fevereiro'
            case 2: return 'Março'
            case 3: return 'Abril'
            case 4: return 'Maio'
            case 5: return 'Junho'
            case 6: return 'Julho'
            case 7: return 'Agosto'
            case 8: return 'Setembro'
            case 9: return 'Outubro'
            case 10: return 'Novembro'
            case 11: return 'Dezembro'
        }
    }

    if (props.data.length == 0) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Nenhuma publicação encontrada!',
            showConfirmButton: false,
            timer: 2000
        });
    }

    return (
        <span>

            <div id="div-style" className="box-body">
                <Row>
                    <Grid cols="0 0 1 3" />
                    <Grid cols="12 12 10 6">
                        <div className="form-group input-group div-center-style">
                            <span onClick={() => searchPosts(state.txtSearch)} style={{ "cursor": "pointer" }} className="input-group-addon">
                                <i className="glyphicon glyphicon-search"></i>
                            </span>
                            {/* <button type="submit" id="" className={`btn btn-default`}><span className="fa fa-search"></span></button> */}
                            <input name="search" id="search" placeholder="Procurar Postagens..." type="text" className="form-control" value={state.txtSearch} onChange={e => txtSearchChanged(e)}></input>
                        </div>
                    </Grid>
                    <Grid cols="0 0 1 3" />
                </Row>
            </div>

            <fieldset>
                <div id="div-style"><legend>Últimas Postagens</legend></div>
                <div className="flex-container">
                    {posts.map(post =>
                        <div key={post.id}>
                            <Card
                                post={post}
                                title={post.postTitle}
                                action={props.action}
                                user={post.author}
                                date={
                                    (new Date(post.createdAt).getDate()) ?
                                        new Date(post.createdAt).getDate() + ' de ' +
                                        getMonthWritten(new Date(post.createdAt).getMonth()) + ' de ' +
                                        new Date(post.createdAt).getFullYear()
                                        : 'Data sem definição'
                                }
                                img={post.postImageURL ? post.postImageURL : imgDefault}
                            />
                        </div>
                    )}
                </div>
            </fieldset>

        </span>
    );


}
