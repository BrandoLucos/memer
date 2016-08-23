var express = require('express');
var router = express.Router();
var meme = require('../models/memes');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}
function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

router.get('/create', authenticate, function(req, res, next) {
  // get all the memes and render the index view
  var memes = currentUser.memes;
  res.render('memes/create', { memes: memes, message: req.flash() });
});
router.get('/classic', authenticate, function(req, res, next) {
  // get all the memes and render the index view
  var memes = currentUser.memes;
  res.render('memes/classic', { memes: memes, message: req.flash() });
});

// INDEX
router.get('/', authenticate, function(req, res, next) {
  var memes = global.currentUser.memes;
  res.render('memes/index', { memes: memes, message: req.flash() });
console.log(memes);
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var meme = {
    title: '',
    completed: false
  };
  res.render('memes/new', { meme: meme, message: req.flash() });
});


// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var meme = currentUser.memes.id(req.params.id);
  if (!meme) return next(makeError(res, 'Document not found', 404));
  res.render('memes/show', { meme: meme, message: req.flash() } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var meme = {
    title: req.body.title,
    completed: req.body.completed ? true : false
  };
  // Since a user's memes are an embedded document, we just need to push a new
  // meme to the user's list of memes and save the user.
  currentUser.memes.push(meme);
  currentUser.save()
  .then(function() {
    res.redirect('/memes');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var meme = currentUser.memes.id(req.params.id);
  if (!meme) return next(makeError(res, 'Document not found', 404));
  res.render('memes/edit', { meme: meme, message: req.flash() } );
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var meme = currentUser.memes.id(req.params.id);
  if (!meme) return next(makeError(res, 'Document not found', 404));
  else {
    meme.title = req.body.title;
    meme.completed = req.body.completed ? true : false;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/memes');
    }, function(err) {
      return next(err);
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var meme = currentUser.memes.id(req.params.id);
  if (!meme) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.memes.indexOf(meme);
  currentUser.memes.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
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
