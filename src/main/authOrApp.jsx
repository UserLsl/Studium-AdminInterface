import React, { useState } from 'react';
import axios from 'axios';
import '../resources/dependencies';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Auth from '../main/auth';
import App from '../main/app';

const uri = 'https://archetypeofficial.herokuapp.com/graphql';
const client = new ApolloClient({ uri });

export default props => {

    const [ state, setState ] = useState({
        logged: false
    });

    if(state.logged) {

        // axios.get(
        //     `http://archetypeofficial.herokuapp.com/user`
        // ).then((result) => {
        //     console.log('eu')
        //     console.log(result)
        // })

        return (
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
    } else {
        return (
            <ApolloProvider client={client}>
                <Auth changeState={setState} />
            </ApolloProvider>
        );
    }


}