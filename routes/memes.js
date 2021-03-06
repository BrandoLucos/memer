var express = require('express');
var router = express.Router();
var Meme = require('../models/memes');


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
router.get('/modify/:tag', authenticate, function (req, res, next) {
  console.log('modify:', req.params.tag);
  Meme.findOne({"tags": req.params.tag})
  .then(function (meme) {
    console.log('meme:', meme);
    res.render ('memes/edit', {meme : meme});
   }, function(err) {
    return next(err)
  });
});

// CREATE
router.post('/create', authenticate, function(req, res, next) {
  console.log('memes create');

  var newMeme = new Meme({
    title: req.body.title,
    top: req.body.top,
    bottom: req.body.bottom,
    image: req.body.image
  });
  newMeme.tags.push(req.body.tag);
  console.log('saving new meme:', newMeme);
  currentUser.memes.push(newMeme);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/memes');
  }, function(err) {
    return next(err);
  });
});

router.get('/browse', authenticate, function(req, res, next) {
  // get all the memes and render the index view
  Meme.find({})
  .then(function(memes) {
    res.render('memes/browse', { memes: memes, message: req.flash() });
  }, function(err) {
    return next(err);
  });
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
  };
  res.render('memes/new', { meme: meme, message: req.flash() });
});


// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var meme = currentUser.memes.id(req.params.id);
  if (!meme) return next(makeError(res, 'Document not found', 404));
  res.render('memes/show', { meme: meme, message: req.flash() } );
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
