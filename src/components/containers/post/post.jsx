import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_POSTS, DELETE_POST } from '../../../queries/proceduresPots';

import Content from '../../template/content';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import Posts from './postGroup';
import PostView from './postView';

export default (props) => {

    const [post, setPost] = useState([]);
    const [tabSelected, setTabSelected] = useState('list');
    const [tabsVisible, setTabsVisible] = useState({ list: true, view: false });

    const { loading, error, data, refetch } = useQuery(GET_POSTS);
    const [deletePost] = useMutation(DELETE_POST);

    function tabViewWillMount(visible, target, newPost) {
        console.log(newPost);
        setPost(newPost);
        renderTabSelected(visible, target);
    }

    function renderTabSelected(visible, target) {
        setTabsVisible({ view: visible, list: !visible });
        setTabSelected(target);
    }

    function actionDeletePost(id) {
        deletePost({ variables: { id } });
        renderTabSelected(true, 'list');
        refetch();
    }

    if (error) throw new error();

    if (loading) {
        return (
            <div className="container-load">
                <div className="load style"> <i className="fa fa-cog fa-spin fa-5x fa-fw"></i><span className="sr-only">Loading...</span> </div>
            </div>
        );
    } else if (data) {
        return (
            <div>
                <Content title="Postagens" small="Movimentações">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <TabHeader label="Listar" icon="th" target="list" update={setTabSelected} selected={tabSelected} visible={tabsVisible.list} />
                            <TabHeader label="Visualizar" icon="newspaper-o" target="view" update={setTabSelected} selected={tabSelected} visible={tabsVisible.view} />
                        </ul>
                        <ul className="tab-content">
                            <TabContent id='list' selected={tabSelected}>
                                <Posts data={data.posts.posts} action={tabViewWillMount} />
                            </TabContent>
                            <TabContent id='view' selected={tabSelected}>
                                <PostView title={post.postTitle} image={post.postImageURL} post={post} onDeleted={actionDeletePost} onBack={renderTabSelected} />
                            </TabContent>
                        </ul>
                    </div>
                </Content>
            </div >
        );
    } else return <p>Nenhuma postagem encontrada</p>;
}



