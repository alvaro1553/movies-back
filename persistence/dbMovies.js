const { execQuery } = require('./db.js');

async function getMovies() {
    const sql = '' +
        'SELECT movies.id as id, title, TO_CHAR(date, \'dd Mon yyyy\') as date, director, avg(rating) as rating_avg FROM movies ' +
        'LEFT JOIN user_movie ON movies.id = user_movie.movie_id ' +
        'GROUP BY movies.id;';
    return execQuery(sql)
        .then(result => result.rows)
}

async function getMovieComments(id) {
    const sql = '' +
    'SELECT movies.id as id, title, TO_CHAR(date, \'dd Mon yyyy\') as date, director, rating , comment, email ' +
    'FROM movies ' +
    'LEFT JOIN user_movie ON movies.id = user_movie.movie_id ' +
    'LEFT JOIN users ON users.email= user_movie.user_email ' +
    `WHERE movies.id = ${id};`;
    return execQuery(sql)
        .then(result => result.rows)
}

async function insertMovieComment(userEmail, movieId, comment, rating) {
    const sql = '' +
        'INSERT INTO user_movie(user_email, movie_id, comment, rating) ' +
        `VALUES('${userEmail}', ${movieId}, '${comment}', ${rating});`
    return execQuery(sql).then((result)=>{
        return result
    }).catch((err)=>{
        console.log('error')
    })
}
module.exports = {
    getMovies,
    getMovieComments,
    insertMovieComment
};