import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import GET_USERS from '../../../queries/getUsers';

import Content from '../../template/content';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import List from './userList';
import Form from '../../common/form/form';
import FormItem from '../../common/form/formItem';
import Grid from '../../common/layout/grid';

export default props => {

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState('list');
    const [user, setUser] = useState([]);
    const client = useApolloClient();
    const { loading, error, data } = useQuery(GET_USERS);

    useEffect(() => {
        if (data) setUsers(data.users);
    }, [data]);

    useEffect(() => {
        switch (user.userPermission) {
            case "ADMIN": document.getElementById('permission').value = 'ADMIN';
                break;
            case "MOD": document.getElementById('permission').value = 'MOD';
                break;
            case "STANDARD": document.getElementById('permission').value = 'STANDARD';
                break;
        }
    }, [user]);

    function setForm(user, level) {
        let userTemp = user;

        userTemp = { ...userTemp, userLevel: level }
        setUser(userTemp);
    }

    function updateUsers() {
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
        }).then((result) => {
            setUsers(result.data.data.users);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Permissão do usuário atualizada com sucesso!',
                showConfirmButton: false,
                timer: 2000
            });
        });
    }



    const updatePermission = (_id, permission) => {
        axios({
            url: 'https://archetypeofficial.herokuapp.com/graphql',
            method: 'post',
            data: {
                query: `
                mutation {
                    updateUser (
                            _id: "${_id.replace(/['"]+/g, '')}",
                            userPermission: ${permission.replace(/['"]+/g, '')},
                    ), {
                      id
                    }
                  }
                `
            }
        }).then((result) => {
            updateUsers();
        });
    }

    if (data) {
        if (data.users.length == 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Nenhum usuário encontrado!',
                showConfirmButton: false,
                timer: 2000
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
    } else if (users.length > 0) {
        return (
            <div>
                <Content title="Usuários" small="Movimentações">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <TabHeader label="Listar" icon="bars" target="list" update={setSelected} selected={selected} visible={true} />
                        </ul>
                        <ul className="tab-content">
                            <TabContent id='list' selected={selected}>
                                {/* <Form user={user} formName='Formulário' update={updatePermission} /> */}
                                <Form formName='Formulário'>
                                    <div>
                                        <FormItem type='text' name='name' text='Nome:' disabled={true} cols="12 6 3" value={user.nickname} />
                                        <FormItem type='text' name='email' text='E-mail:' disabled={true} cols="12 6 3" value={user.username} />
                                        <FormItem type='text' name='level' text='Nível:' disabled={true} cols="12 6 2" value={user.userLevel} />
                                        <Grid cols="12 6 2">
                                            <label className="label-form-style" htmlFor="permission">Permissão:</label>
                                            <select className="form-control" id="permission">
                                                <option value="STANDARD">Padrão</option>
                                                <option value="MOD">Moderador</option>
                                                <option value="ADMIN">Administrador</option>
                                            </select>
                                        </Grid>
                                        <Grid cols="12 12 2">
                                            <button type="submit" id="button-control-form-style" className={`btn btn-success`} onClick={() => updatePermission(user.id, document.getElementById('permission').value)}>Atualizar</button>
                                        </Grid>
                                    </div>

                                </Form>
                                <List list={users} setForm={setForm} tableName='Lista de Usuários' />
                            </TabContent>
                        </ul>
                    </div>
                </Content>
            </div>
        );
    } else {
        return <p>Nenhum usuário encontrado</p>;
    }
}