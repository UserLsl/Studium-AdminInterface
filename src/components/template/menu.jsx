import React, { useState } from 'react';
import MenuItem from './menuItem';
import MenuTree from './menuTree';

export default props => {

    const [menuTreeSelected, setMenuTreeSelected] = useState('');

    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <ul className="sidebar-menu" data-widget="tree">
                    <MenuItem path='#' label='Dashboard' icon='dashboard' />
                    {/* <MenuTree label='Cadastros' icon='plus-square'>
                        <MenuItem path='#/users' label='Usuários' icon='user-circle-o' />
                        <MenuItem path='#/categories' label='Categorias' icon='puzzle-piece' />
                    </MenuTree> */}
                    <MenuTree setMenuTree={setMenuTreeSelected} menuTree={menuTreeSelected} name='Cadastros' icon='plus-square'>
                        <MenuItem path='#/categories' label='Categorias' icon='folder' /> {/* tags */}
                    </MenuTree>
                    <MenuTree setMenuTree={setMenuTreeSelected} menuTree={menuTreeSelected} name='Movimentações' icon='refresh'>
                        <MenuItem path='#/users' label='Usuários' icon='user-circle-o' />
                        <MenuItem path='#/post' label='Postagens' icon='pencil-square-o' />
                    </MenuTree>
                    <MenuTree setMenuTree={setMenuTreeSelected} menuTree={menuTreeSelected} name='Denúncias' icon='comments'>
                        <MenuItem path='#/reportComments' label='Comentários' icon='comment' />
                        <MenuItem path='#/reportPosts' label='Postagens' icon='edit' />
                    </MenuTree>
                    {/* <MenuItem path='#' label='Configurações' icon='cog' /> */}
                </ul>
            </section>
        </aside>
    );
}