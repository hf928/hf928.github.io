import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';

import { OAuthClientID } from '../../config';

const QUERY = `
{
    curUser {
        _id
        name
        email
        avatar
    }
}
`;

const Login = ({ classes }) => {

    const onSuccess = async (googleUser) => {

        const idToken = googleUser.getAuthResponse().id_token;

        const client = new GraphQLClient('http://localhost:4000/graphql', {
            headers: {
                authorization: idToken
            }
        });
        
        const res = await client.request(QUERY);

        console.log(res);
        
        
    }

    return (
        <GoogleLogin
            clientId={OAuthClientID}
            onSuccess={onSuccess}
            isSignedIn={true}
        />
    );

};

export default Login;
