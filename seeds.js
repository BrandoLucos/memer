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
  var youDontSay          = new Meme({ title: 'You Dont Say',  image: 'https://ip.bitcointalk.org/?u=https%3A%2F%2Fdl.dropboxusercontent.com%2Fu%2F96353231%2Fmeme%2FreadImage.jpg&t=566&c=jf851N_C5c2zmQ', tags:'you dont say'});
  var foreverAlone        = new Meme({ title: 'Forever Alone', image: 'https://imgflip.com/s/meme/Forever-Alone.jpg', tags:'awkward'});
  var badLuckBrian        = new Meme({ title: 'Bad Luck Brian',  image: 'http://www.comicsandmemes.com/wp-content/uploads/2013/04/bad-luck-brian.png', tags:'bad luck brian' });
  var whyUNo              = new Meme({ title: 'Why U No', image:'http://www.instructables.com/files/deriv/F1M/VUND/GZKG37BW/F1MVUNDGZKG37BW.LARGE.jpg', tags:'why u no'});
  var scumbagSteve        = new Meme({ title: 'Scumbag Steve', image:'http://i0.kym-cdn.com/photos/images/newsfeed/000/093/953/c5b.jpg', tags:'scumbag steve'});
  var noFace              = new Meme({ title: 'NO Face', image:'https://cdn.meme.am/images/300x/7420041.jpg', tags:'no'});
  var philosoraptor       = new Meme({ title: 'Philosoraptor', image:'https://imgflip.com/s/meme/Philosoraptor.jpg', tags:'philosoraptor'});
  var oneCannotSimply     = new Meme({ title: 'One Cannot Simply', image:'http://nevolia.net/attachment.php?attachmentid=34383&stc=1&d=1452859325', tags:'one cannot simply'});
  var overlyManlyMan      = new Meme({ title: 'Overly Manly Man', image:'https://imgflip.com/s/meme/Overly-Manly-Man.jpg', tags:'overly manly man'});
  var babyGodfather       = new Meme({ title: 'Baby Godfather', image:'https://imgflip.com/s/meme/Baby-Godfather.jpg', tags:'baby godfather'});
  var successKid          = new Meme({ title: 'Success Kid', image:'https://imgflip.com/s/meme/Success-Kid.jpg', tags:'success kid'});
  var josephDucreux       = new Meme({ title: 'Joseph Ducreux', image:'https://s-media-cache-ak0.pinimg.com/564x/eb/ce/09/ebce092a6a321fab49d9cae0b61ff07f.jpg', tags:'joseph ducreux'});
  var futuramaFry         = new Meme({ title: 'Futurama Fry', image:'https://imgflip.com/s/meme/Futurama-Fry.jpg', tags:'futurama fry'});
  var faceYouMake         = new Meme({ title: 'Face You Make', image:'https://s-media-cache-ak0.pinimg.com/236x/22/39/92/223992a371aecc5186878cda234a0b18.jpg', tags:'face you make'});
  var yoDawgHeardYou      = new Meme({ title: 'Yo Dawg Heard You', image:'https://imgflip.com/s/meme/Yo-Dawg-Heard-You.jpg', tags:'yo dawg heard you'});
  var batmanSlapMeme      = new Meme({ title: 'Batman Slap Meme', image:'http://www.fotoefectos.com/efectos/examples/2/escena-fotomontaje-batman-robin-tortazo-meme.jpg', tags:'batman slap meme'});
  var africanDancingBaby  = new Meme({ title: 'African Danicng Baby', image:'https://i.ytimg.com/vi/LfqMgUkQpR0/hqdefault.jpg', tags:'african dancing baby'});
  var unhelpfulTeacher    = new Meme({ title: 'Unhelpful Teacher', image:'http://www.memecreator.org/static/images/templates/8274.jpg', tags:'unhelpful teacher'});
  var mindBlown           = new Meme({ title: 'Mind Blown', image:'http://i0.wp.com/conduit1.com/wp-content/uploads/blank-meme-013-keanue-reeves-mind-blown.jpg?resize=396%2C286', tags:'mind blown'});
  var drinkMyOwnPiss      = new Meme({ title: 'Drink My own Piss', image:'http://demo.wpgoods.com/wp-content/uploads/2013/07/bear_grylls.jpg', tags:'drink my own piss meme'});
  var starTrekWtf         = new Meme({ title: 'Star Trek WTF', image:'http://i.imgur.com/v4Ewvxz.png', tags:'startrek wtf'});
  var thatEscalatedQuickly= new Meme({ title: 'That Escalated Quickly', image:'http://meme.ducknew.com/uploads/images/ron_burgundy_boy_that_escalated_quickly.jpg.png', tags:'boy that escalated quickly'});
  var youMeanToTellMe     = new Meme({ title: 'You Mean To Tell Me', image:'https://cdn.meme.am/images/5126800.jpg', tags: 'you mean to tell me'});
  var grumpyCat           = new Meme({ title: 'Grumpy Cat', image:'https://imgflip.com/s/meme/Grumpy-Cat.jpg', tags: 'grumpy cat'});
  var jackieChanWtf       = new Meme({ title: 'Jackie Chan WTF', image:'http://www.relatably.com/m/img/blank-memes-pictures/9296953505f39365f6.jpg', tags: 'jackie chan wtf'});
  var condescendingWonka  = new Meme({ title: 'Condescending Wonka', image:'https://imgflip.com/s/meme/Creepy-Condescending-Wonka.jpg', tags: 'condescending wonka'});




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
