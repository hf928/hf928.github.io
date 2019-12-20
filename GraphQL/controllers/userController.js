const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User');

// 創建一個 OAuth client 以調用
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async (token) => {

    // 由 token 取得 google 用戶資料
    const googleUser = await verifyAuthToken(token);

    // 以 email 從 DB 中取得 User
    const user = await checkIfUserExists(googleUser.email);

    // 回傳用戶；若 user 不存在，則建立後回傳
    return user ? user : createNewUser(googleUser);

}

const verifyAuthToken = async (token) => {

    try {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });

        return ticket.getPayload();

    }
    catch (e) {

        console.error(e);        

    }

}

const checkIfUserExists = async (email) => await User.findOne({ email }).exec();

const createNewUser = (googleUser) => {

    const { name, email, picture } = googleUser;
    const user = { name, email, avatar: picture };

    return new User(user).save();

}
