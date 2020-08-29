const express = require('express');
const router = express.Router();
const dsApp = require('../service/dsApp');

router.post('/signup', async (req, res) => {
    if(!req.body) return res.status(400).send('Bad Request: body of the request missing');
    try {
        await dsApp.newUser(req.body);
    } catch(err){
        return res.status(500).send('Internal Server Error: ' + err.message)
    }
    res.status(201).send('New user created')
});

router.post('/login', async (req, res) => {
    if(!req.body) return res.status(400).send('Bad Request: body of the request missing');
    try{
        if ( await dsApp.hasAccess(req.body) ) {
            res.status(200).send('Ok: Access granted');
        } else {
            return res.status(401).send('Unauthorized: wrong password');
        }
    } catch (err){
        return res.status(500).send('Internal Server Error: ' + err.message);
    }

});

module.exports = router;