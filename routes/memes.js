var express = require('express');
var router = express.Router();
var Meme = require('../models/memes');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

let memes = [
  {
    title: 'Star Wars',
    image: 'Science Fiction',
    genre:  1977
  },
  {
    title: 'Groundhog Day',
    image: 'Comedy',
    genre:  1993
  }
  {
    title: 'Groundhog Day',
    image: 'Comedy',
    genre:  1993
  }
];

// INDEX
router.get('/', function(req, res, next) {
  // get all the memes and render the index view
  meme.find({}).sort('-createdAt')
  .then(function(memes) {
    res.render('memes/index', { memes: memes } );
  }, function(err) {
    return next(err);
  });
});

// NEW
router.get('/new', function(req, res, next) {
  var meme = {
    title: '',
    completed: false
  };
  res.render('memes/new', { meme: meme } );
});

// SHOW
router.get('/:id', function(req, res, next) {
  meme.findById(req.params.id)
  .then(function(meme) {
    if (!meme) return next(makeError(res, 'Document not found', 404));
    res.render('memes/show', { meme: meme });
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', function(req, res, next) {
  var meme = new meme({
    title:     req.body.title,
    completed: req.body.completed ? true : false
  });
  meme.save()
  .then(function(saved) {
    res.redirect('/memes');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  meme.findById(req.params.id)
  .then(function(meme) {
    if (!meme) return next(makeError(res, 'Document not found', 404));
    res.render('memes/edit', { meme: meme });
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', function(req, res, next) {
  meme.findById(req.params.id)
  .then(function(meme) {
    if (!meme) return next(makeError(res, 'Document not found', 404));
    meme.title = req.body.title;
    meme.completed = req.body.completed ? true : false;
    return meme.save();
  })
  .then(function(saved) {
    res.redirect('/memes');
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', function(req, res, next) {
  meme.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/memes');
  }, function(err) {
    return next(err);
  });
});

// TOGGLE completed
router.get('/:id/toggle', function(req, res, next) {
  meme.findById(req.params.id)
  .then(function(meme) {
    if (!meme) return next(makeError(res, 'Document not found', 404));
    meme.completed = !meme.completed;
    return meme.save();
  })
  .then(function(saved) {
    res.redirect('/memes');
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
