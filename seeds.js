var mongoose = require('mongoose');
var User = require('./models/user.js');
var Meme = require('./models/memes.js');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/express-memes');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old users...');
User.remove({})
.then(function() {
  console.log('removing old memes...');
  return Meme.remove({});
})
.then(function() {
  console.log('old memes removed');
  console.log('creating new user...');
  var user = new User();
  user.local = {
    email    : 'joe@hacker.com',
    password : user.encrypt('test1234')
  };
  user.memes = [];
  return User.create(user);
})
.then(function(newUser) {
  return User.findOne({ 'local.email' : 'joe@hacker.com' });
})
.then(function(joe) {
  console.log('creating some new memes...');
  var youDontSay   = new Meme({ title: 'You Dont Say',  image: 'http://www.bloodygoodhorror.com/bgh/files/reviews/caps/vampires-kiss.jpg',   genre: 'Sarcastic', tags:'#'});
  var foreverAlone = new Meme({ title: 'Forever Alone', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS5H4vkXOU09xyJRWOZXeTtwYsFFTXk56-RQFZU0vID20Tf6Vac', genre: 'Awkward', tags:'#'});
  var badLuckBrian = new Meme({ title: 'Bad Luck Brian',  image: 'https://s-media-cache-ak0.pinimg.com/236x/cb/41/ed/cb41ed5037bbf2bfce84cd33cf5ccb41.jpg', genre: 'Awkward', tags:'#' });
  var whyUNo       = new Meme({ title: 'Why U No', image:'', genre:'', tags:''});
  // var ""       = new Meme({ title: '', image:'', genre:'', tags:''});
  // var ""       = new Meme({ title: '', image:'', genre:'', tags:''});
  // var ""       = new Meme({ title: '', image:'', genre:'', tags:''});
  // var ""       = new Meme({ title: '', image:'', genre:'', tags:''});
  // var ""       = new Meme({ title: '', image:'', genre:'', tags:''});

  [youDontSay, foreverAlone, badLuckBrian].forEach(function(meme) {
    joe.memes.push(meme);
  });

  return joe.save();
})
.then(function(joe) {
  console.log('Just saved joe =', joe);
  return User.find({});
})
.then(function(allUsers) {
  console.log('Printing all users:');
  allUsers.forEach(function(user) {
    console.log(user);
  });
  quit();
}, function(err) {
  return handleError(err);
});
