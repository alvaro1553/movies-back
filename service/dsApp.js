const argon2 = require('argon2');
const db = require('../persistence/dbUser');
const User = require('../models/User');

function mapToUser(bodyJson){
    //Read json
    const email = bodyJson.email;
    const secret = bodyJson.secret;
    if(!email){
        const message = 'Json email is missing'
        throw new Error(message);
    }
    if (!secret){
        const message = 'Json secret is missing'
        throw new Error(message);
    }
    //Create user
    const user = new User();
    user.email = email;
    user.secret = secret;
    return user;
}

exports.newUser = async function (bodyJson){
    //Map Json to User (validation)
    const user = mapToUser(bodyJson);
    //Insert in db
    return await db.insertUser(user);
}

exports.hasAccess = async function (bodyJson){
    //Map Json to User (validation)
    const user = mapToUser(bodyJson)
    //Get user
    let userDB = await db.getUser(user.email)
    if(!userDB) throw new Error('Email does not exist');
    //Check user credentials
    const isMatch = await argon2.verify(userDB.hash, user.secret);
    if(!isMatch) return false;
    return true;
}