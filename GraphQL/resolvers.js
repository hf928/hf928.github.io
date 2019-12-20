const { AuthenticationError } = require('apollo-server');

const authenticated = (next) => (root, args, ctx, info) => {

    if (!ctx.user) {

        throw new AuthenticationError('You must be logged in.');

    }

    return next(root, args, ctx, info);

};

module.exports = {
    Query: {
        curUser: authenticated((root, args, ctx) => ctx.user)
    }
};
