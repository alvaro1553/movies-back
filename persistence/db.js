const { Pool, Client } = require('pg');
const {
    PGHOST: HOST,
    PGPORT: PORT,
    PGUSER: USER,
    PGPASSWORD: PASSWORD,
    PGDATABASE: DATABASE,
} = process.env;

let pool;

async function init() {
    pool = new Pool();
}

async function teardown() {
    return pool.end();
}

async function execQuery(sql, parameters){
    return pool.query(sql, parameters)
        .then(result => result)
        .catch(err => err);
}

module.exports = {
    init,
    teardown,
    execQuery
};


