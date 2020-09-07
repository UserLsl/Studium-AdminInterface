import React from 'react';

import Content from '../../template/content';
import ValueBox from '../../common/widget/valueBox';
import Row from '../../common/layout/row';

export default () => {
    return (
        <Content title="Dashboard" small="Versão 1.0">
            <Row>
                <ValueBox cols="12 12 4 4" color="green" icon="users" value={482} text="Total de Usuários logados" />
                <ValueBox cols="12 12 4 4" color="red" icon="user-plus" value={5792} text="Total de Usuários cadastrados" />
                <ValueBox cols="12 12 4 4" color="blue" icon="pencil-square-o" value={7896} text="Total de postagens" />
            </Row>
        </Content>
    );
}