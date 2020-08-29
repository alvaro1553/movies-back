const { execQuery } = require('./db.js');
const argon2 = require('argon2');

async function insertUser(user) {
    const hash = await argon2.hash(user.secret);
    const sql = 'INSERT INTO users(email, hash) VALUES($1, $2);';
    const parameters = [user.email, hash];
    return execQuery(sql, parameters)
        .catch(err => {
            const msg = 'error executing sql to insert user';
            throw new Error(msg);
        });
}

async function getUser(email) {
    const sql = 'SELECT email, hash FROM users WHERE email=$1;';
    const parameters = [email];
    return execQuery(sql, parameters)
        .then(result => result.rows[0])
        .catch(err => {
            const msg = 'error executing sql to get user';
            throw new Error(msg);
        });
}

module.exports = {
    insertUser,
    getUser
};