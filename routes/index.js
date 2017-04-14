var express = require('express');
var router = express.Router();
var db = require('../queries');


router.get('/post', db.getAllPost);
router.get('/post/:id', db.getSinglePost);
router.post('/post', db.createPost);
router.put('/post/:id', db.updatePost);
router.delete('/post/:id', db.removePost);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
