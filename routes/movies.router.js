let express = require('express');
let router = express.Router();
let dbMovies = require('../persistence/dbMovies');

router.get('/', async function(req, res, next) {
  dbMovies.getMovies().then((movies)=>{
      res.status(200).json(movies);
  }).catch((err)=>{
        res.status(500).send(err.message);
  })
});

router.get('/:id', async function(req, res, next) {
    dbMovies.getMovieComments(req.params.id).then((comments)=>{
        res.status(200).json(comments);
    }).catch((err)=>{
        res.status(500).send(err.message);
    })
});

router.post('/:id', async function(req, res, next) {
    const { useremail, movieid, comment, rating
    } = req.body
    dbMovies.insertMovieComment(useremail, movieid, comment, rating).then(()=>{
        res.status(200).send('comment added');
    }).catch((err)=>{
        res.status(500).send(err.message);
    })
});

module.exports = router;
