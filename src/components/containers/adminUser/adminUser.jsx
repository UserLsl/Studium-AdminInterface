import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import GET_USERS from '../../../queries/getUsers';

import Content from '../../template/content';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import Table from '../../common/table/table';
import Form from '../../common/form/form';

// import List from './billingCycleList';
// import Form from './billingCycleForm';

export default props => {

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState('list');
    const [user, setUser] = useState([]);
    const client = useApolloClient();
    const { loading, error, data } = useQuery(GET_USERS);

    useEffect(() => {
        if (data) setUsers(data.users);
    }, [data]);

    function setForm(user) {
        setUser(user);
    }

    function teste() {
        axios({
            url: 'https://archetypeofficial.herokuapp.com/graphql',
            method: 'post',
            data: {
                query: `
                    {
                        users {
                          id
                          userName
                          userPassword
                          userEmail
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
            // console.log(result.data.data.users);
            setUsers(result.data.data.users)
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
            console.log(result.data)
            teste();
        });
    }

    //updatePermission("5f31e59a7348992a0c90bb4c", "ADMIN");


    // const updatePermission = (_id, permission) => {
    //     const updateUser = client.mutate({
    //         variables: { _id, permission },
    //         mutation: gql`
    //             mutation updateUser($_id: String, $permission: PermissionLevels){
    //                 updateUser(_id: $_id, userPermission: $permission) { id }
    //             }
    //         `,
    //     });
    // }

    // const deletePost = async (_id) => {
    //     const deletedPost = await client.mutate({
    //         variables: { _id },
    //         mutation: gql`
    //     mutation deletePost($_id: String){
    //       deletePost(_id: $_id) { id }
    //     }
    // `,
    //     })
    //     const deletedId = await deletedPost.data.deletePost.id;
    //     setPosts(posts.filter(post => post.id !== deletedId))
    // }


    if (error) throw new error();

    if (loading) {
        return <p>Carregando...</p>
    } else if (users.length > 0) {
        return (
            <div>
                <Content title="Usuários" small="Cadastros">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <TabHeader label="Listar" icon="bars" target="list" update={setSelected} selected={selected} />
                        </ul>
                        <ul className="tab-content">
                            <TabContent id='list' selected={selected}>
                                <Form user={user} formName='Formulário' update={updatePermission} />
                                <Table list={users} setForm={setForm} tableName=' Lista de Usuários' />
                            </TabContent>
                        </ul>
                    </div>
                </Content>
            </div>
        );
    } else return <p>Nenhum usuário administrador encontrado</p>;
}




{/* <div>
    <ContentHeader title="Ciclos de Pagamento" small="Cadastros" />
    <Content>
        <Tabs>
            <TabsHeader>
                <TabHeader label="Listar" icon="bars" target="tabList" />
                <TabHeader label="Incluir" icon="plus" target="tabCreate" />
                <TabHeader label="Alterar" icon="pencil" target="tabUpdate" />
                <TabHeader label="Excluir" icon="trash-o" target="tabDelete" />
            </TabsHeader>
            <TabsContent>
                <TabContent id='tabList'>
                    <List />
                </TabContent>
                <TabContent id='tabCreate'>
                    <Form onSubmit={this.props.create} submitLabel="Incluir" submitClass="primary" />
                </TabContent>
                <TabContent id='tabUpdate'>
                    <Form onSubmit={this.props.update} submitLabel="Alterar" submitClass="info" />
                </TabContent>
                <TabContent id='tabDelete'>
                    <Form onSubmit={this.props.remove} readOnly={true} submitLabel="Excluir" submitClass="danger" />
                </TabContent>
            </TabsContent>
        </Tabs>
    </Content>
</div> */}





{/* <div>
    <Content title="Usuários" small="Cadastros">
        <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
                <TabHeader label="Administradores" icon="bars" target="adminUser" update={setSelectedTab} selected={selectedTab} />
                <TabHeader label="Moderadores" icon="bars" target="modeUser" update={setSelectedTab} selected={selectedTab} />
            </ul>
            <ul className="tab-content">
                <TabContent id='adminUser' selected={selectedTab}>
                    {adminUsers.map(user =>
                        <div key={user.id}>
                            <p>{user.userName}</p>
                            <p>{user.id}</p>
                            <p>{user.userPermission}</p>
                        </div>
                    )}
                </TabContent>
                <TabContent id='modeUser' selected={selectedTab}>
                    {modUsers.map(user =>
                        <div key={user.id}>
                            <p>{user.userName}</p>
                            <p>{user.id}</p>
                            <p>{user.userPermission}</p>
                        </div>
                    )}
                </TabContent>
            </ul>
        </div>
    </Content>
</div> */}