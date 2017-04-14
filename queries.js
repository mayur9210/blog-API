var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/blog';
var db = pgp(connectionString);

function getAllPost(req, res, next) {
  db.any('select * from post')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL post'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePost(req, res, next) {
  var postID = parseInt(req.params.id);
  db.one('select * from post where post_id = $1', postID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE post'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPost(req, res, next) {
  db.none('insert into post(title, body, username, date)' +
      'values(${title}, ${body}, ${username}, ${date})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one post'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePost(req, res, next) {
  db.none('update post set title=$1, body=$2, username=$3, date=$4 where post_id=$5',
    [req.body.title, req.body.body, req.body.username,
      req.body.date, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated post'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePost(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from post where post_id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} post'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllPost: getAllPost,
  getSinglePost: getSinglePost,
  createPost: createPost,
  updatePost: updatePost,
  removePost: removePost
};
