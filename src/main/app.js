import React from 'react';
import '../resources/dependencies';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Header from '../components/template/header';
import Menu from '../components/template/menu';
import Rodape from '../components/template/footer';
import Routes from './routes';

const uri = 'https://archetypeofficial.herokuapp.com/graphql';
const client = new ApolloClient({ uri });

export default props => {
    return (
        <ApolloProvider client={client}>
            <div className="wrapper">
                <Header />
                <Menu />
                <div className="content-wrapper">
                    <Routes />
                </div>
                <Rodape />
            </div>
        </ApolloProvider>
    );
}
