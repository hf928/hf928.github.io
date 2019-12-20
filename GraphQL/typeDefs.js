const { gql } = require('apollo-server');

module.exports = gql`

    type User {
        _id: ID
        name: String
        email: String
        avatar: String
    }

    type Query {
        curUser: User
    }
    
`;
