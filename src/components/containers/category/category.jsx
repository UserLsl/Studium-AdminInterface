import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';

import {GET_CATEGORIES, INSERT_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from '../../../queries/proceduresCategory';

import List from './categoryList';
import Content from '../../template/content';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import Form from '../../common/form/form';
import FormItem from '../../common/form/formItem';
import Grid from '../../common/layout/grid';

export default props => {

    const [category, setCategory] = useState([]);
    const [tabsVisible, setTabsVisible] = useState({ list: true, update: false, create: true });
    const [tabSelected, setTabSelected] = useState('list');
    const [categoryPosts, setCategoryPosts] = useState('');

    // const [getCategories, { loading, error, data }] = useLazyQuery(GET_CATEGORIES);
    const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);
    const [updateCategory] = useMutation(UPDATE_CATEGORY);
    const [insertCategory] = useMutation(INSERT_CATEGORY);
    const [deleteCategory] = useMutation(DELETE_CATEGORY);

    useEffect(() => {
        refetch();
        setCategoryPosts((tabsVisible.update) ? category.categoryPosts.length : '');
    }, [tabsVisible]);

    function tabUpdateWillMount(visible, target, newCategory) {
        setCategory(newCategory);
        renderTabSelected(visible, target);
    }

    function actionUpdateCategory() {
        updateCategory({ variables: { id: category.id, categoryTitle: category.categoryTitle} });
        renderTabSelected(false, 'list');
    }

    function actionInsertCategory(value) {
        insertCategory({ variables: { categoryTitle: value } });
        renderTabSelected(false, 'list');
    }

    function actionDeleteCategory(id) {
        deleteCategory({ variables: { id } });
        refetch();
    }

    function renderTabSelected(visible, target) {
        setTabsVisible({ create: !visible, update: visible, list: !visible });
        setTabSelected(target);
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
                <Content title="Categorias" small="Cadastros">
                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <TabHeader label="Listar" icon="bars" target="list" update={setTabSelected} selected={tabSelected} visible={tabsVisible.list} />
                            <TabHeader label="Editar" icon="pencil" target="update" update={setTabSelected} selected={tabSelected} visible={tabsVisible.update} />
                            <TabHeader label="Novo" icon="plus" target="create" update={setTabSelected} selected={tabSelected} visible={tabsVisible.create} />
                        </ul>
                        <ul className="tab-content">
                            <TabContent id='list' selected={tabSelected}>
                                <List list={data.categories} tableName='Lista de Categorias' actionUpdate={tabUpdateWillMount} actionDelete={actionDeleteCategory} />
                            </TabContent>
                            <TabContent id='update' selected={tabSelected}>
                                <Form formName='Alterando Categoria'>
                                    <FormItem type='text' name='id' text='Código:' disabled={true} cols="12 6 3 2" value={category.id} />
                                    <FormItem type='text' name='tituloUpdate' text='Titulo:' disabled={false} cols="12 6 3 4" state={category} setState={setCategory} />
                                    <FormItem type='text' name='posts' text='Qtde de Posts:' disabled={true} cols="12 4 2 2" value={categoryPosts} />
                                    <Grid cols="6 4 2 2">
                                        <button id="button-wide-form-style" className={`btn btn-success`} onClick={actionUpdateCategory}>Atualizar</button>
                                    </Grid>
                                    <Grid cols="6 4 2 2">
                                        <button id="button-wide-form-style" className={`btn btn-default`} onClick={() => renderTabSelected(false, 'list')}>Cancelar</button>
                                    </Grid>
                                </Form>
                            </TabContent>
                            <TabContent id='create' selected={tabSelected}>
                                <Form formName='Nova Categoria'>
                                    <FormItem type='text' name='tituloInsert' text='Titulo:' disabled={false} cols="12 7 8 8" />
                                    <Grid cols="6 2 2 2">
                                        <button id="button-wide-form-style" className={'btn btn-success'} onClick={() => actionInsertCategory(document.getElementById('tituloInsert').value)}>Salvar</button>
                                    </Grid>
                                    <Grid cols="6 2 2 2">
                                        <button id="button-wide-form-style" className={'btn btn-default'}onClick={() => renderTabSelected(false, 'list')}>Cancelar</button>
                                    </Grid>
                                </Form>
                            </TabContent>
                        </ul> 
                    </div>
                </Content>
            </div>
        );
    } else return <p>Nenhuma categoria encontrada</p>;

}