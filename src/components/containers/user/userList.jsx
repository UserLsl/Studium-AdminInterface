import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function table(props) {

    const [usersLikes, setUsersLikes] = useState([]);
    const [loading, setLoading] = useState(true);


    console.log(loading)

    useEffect(() => {
        props.list.map((user) => {
            if (user.userPosts.length > 0) getUsersLikes(user);
        });
    }, []);

    function getCalculatedLevel(userId) {
        let expBase = getNumberOfLikes(userId) * 20;

        let calc = (
            Math.cbrt(
                Math.sqrt(3) * Math.sqrt(
                    (243 * Math.pow(expBase, 2)) - (48600 * expBase) + 3680000) + (27 * expBase) - 2700
            )
        )

        return ((calc / Math.pow(30, 2 / 3)) - ((5 * Math.pow(10, 2 / 3)) / (Math.cbrt(3) * calc))) + 2
    }

    function getNumberOfLikes(id) {
        let match = false;
        let number;
        console.log('OPA')

        usersLikes.map((userLikes) => {
            // return (userLikes[1] == id) ? userLikes[0] : 0;
            if (userLikes[1] == id) {
                match = true;
                number = userLikes[0];
            }
        });
        return (match) ? number : 0;
    }

    function getUsersLikes(user) {

        const myPromise = new Promise((resolve, reject) => {
            let counter = 0;
            let data = 0;

            if (user.userPosts.length > 0) {

                user.userPosts.map((postId) => {

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

                        if (counter == user.userPosts.length) {
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

        console.log("Hello")

        myPromise.then((resolvedValue) => {
            let temp = [];
            let count = 0;

            console.log('resolvido: ' + user.id + ': ' + user.nickname)
            console.log(resolvedValue);

            temp = usersLikes;
            temp.push([resolvedValue, user.id]);

            console.log(temp);
            setUsersLikes(temp);

            props.list.map((user) => {
                if (user.userPosts.length > 0) count++;
            });

            console.log('Condição: ' + count + ' = ' + temp.length)

            if (temp.length == count) setLoading(false);

        }, (error) => {
            console.log(error);
        });

    }


    function renderRows() {
        return props.list.map((user, index) => {
            return (
                <tr key={user.id} id={index}>
                    <td>{user.nickname}</td>
                    <td>{user.username}</td>
                    <td>{user.userRanking}</td>
                    <td>{Math.trunc(getCalculatedLevel(user.id))}</td>
                    <td>{user.userPermission}</td>
                    <td>
                        <button type="submit" className={`btn btn-warning`} onClick={() => props.setForm(user, Math.trunc(getCalculatedLevel(user.id)))}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    if (loading) {
        return (
            <div className="container-load">
                <div className="load style"> <i className="fa fa-cog fa-spin fa-5x fa-fw"></i><span className="sr-only">Loading...</span> </div>
            </div>
        );
    } else {
        return (
            <div className="box-body table-responsive">
                <fieldset>
                    <legend>{props.tableName}</legend>
                    <table className="table">
                        <thead>
                            <tr key="thead">
                                <td>Nome</td>
                                <td>E-mail</td>
                                <td>Ranking</td>
                                <td>Nível</td>
                                <td>Permissão</td>
                                <td>Editar</td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </div>
        );
    }

}