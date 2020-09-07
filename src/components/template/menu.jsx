import React from 'react';
import MenuItem from './menuItem';
import MenuTree from './menuTree';

export default props => {
    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <ul className='sidebar-menu'>
                    <MenuItem path='#' label='Dashboard' icon='dashboard' />
                    <MenuTree label='Cadastros' icon='plus-square'>
                        <MenuItem path='#/users' label='Usuários' icon='user-circle-o' />
                        <MenuItem path='#/categories' label='Categorias' icon='puzzle-piece' />
                    </MenuTree>
                    <MenuTree label='Denúncias' icon='comments'>
                        <MenuItem path='#/reportComments' label='Comentários' icon='comment' />
                        <MenuItem path='#/reportPosts' label='Postagens' icon='edit' />
                    </MenuTree>
                </ul>
            </section>
        </aside>
    );
}