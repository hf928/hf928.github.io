/* eslint-disable no-console */
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { findOrCreateUser } = require('./controllers/userController');


// eslint-disable-next-line comma-dangle
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected!'))
    .catch((err) => console.error(`MongoDB Connection Error: ${err.message}`));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {

        let authToken = null;
        let curUser = null;

        try {

            authToken = req.headers.authorization;

            if (authToken) {

                curUser = await findOrCreateUser(authToken);

            }

        }
        catch (e) {

            console.error(e);
            
        }

        return { user: curUser };

    }
});

server.listen()
    .then(({ url }) => {

        console.log(`Now listening on ${url} ...`);
        
    });
