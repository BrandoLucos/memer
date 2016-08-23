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
  var youDontSay   = new Meme({ title: 'You Dont Say',  image: 'https://ip.bitcointalk.org/?u=https%3A%2F%2Fdl.dropboxusercontent.com%2Fu%2F96353231%2Fmeme%2FreadImage.jpg&t=566&c=jf851N_C5c2zmQ', tags:'sarcastic'});
  var foreverAlone = new Meme({ title: 'Forever Alone', image: 'https://imgflip.com/s/meme/Forever-Alone.jpg', tags:'awkward'});
  var badLuckBrian = new Meme({ title: 'Bad Luck Brian',  image: 'http://www.comicsandmemes.com/wp-content/uploads/2013/04/bad-luck-brian.png', tags:'awkward' });
  var whyUNo       = new Meme({ title: 'Why U No', image:'http://www.instructables.com/files/deriv/F1M/VUND/GZKG37BW/F1MVUNDGZKG37BW.LARGE.jpg', genre:'', tags:''});
  var scumbagSteve = new Meme({ title: 'Scumbag Steve', image:'http://i0.kym-cdn.com/photos/images/newsfeed/000/093/953/c5b.jpg', tags:'douche'});
  var noFace       = new Meme({ title: '', image:'', tags:''});
  var      = new Meme({ title: '', image:'', tags:''});
  var      = new Meme({ title: '', image:'', tags:''});
  var      = new Meme({ title: '', image:'', tags:''});

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
