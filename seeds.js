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
  var youDontSay          = new Meme({ title: 'You Dont Say',  image: 'http://ct.fra.bz/ol/fz/sw/i60/5/7/8/frabz-c8d0b1.jpg', tags:'youDontSay'});
  var foreverAlone        = new Meme({ title: 'Forever Alone', image: 'https://imgflip.com/s/meme/Forever-Alone.jpg', tags:'foreverAlone'});
  var badLuckBrian        = new Meme({ title: 'Bad Luck Brian',  image: 'https://i.imgflip.com/17ffa.jpg', tags:'badLuckBrian' });
  var whyUNo              = new Meme({ title: 'Why U No', image:'http://www.instructables.com/files/deriv/F1M/VUND/GZKG37BW/F1MVUNDGZKG37BW.LARGE.jpg', tags:'whyUNo'});
  var scumbagSteve        = new Meme({ title: 'Scumbag Steve', image:'http://i0.kym-cdn.com/photos/images/newsfeed/000/093/953/c5b.jpg', tags:'scumbagSteve'});
  var noFace              = new Meme({ title: 'NO Face', image:'https://cdn.meme.am/images/300x/7420041.jpg', tags:'noFace'});
  var philosoraptor       = new Meme({ title: 'Philosoraptor', image:'https://imgflip.com/s/meme/Philosoraptor.jpg', tags:'philosoraptor'});
  var oneCannotSimply     = new Meme({ title: 'One Cannot Simply', image:'http://nevolia.net/attachment.php?attachmentid=34383&stc=1&d=1452859325', tags:'oneCannotSimply'});
  var overlyManlyMan      = new Meme({ title: 'Overly Manly Man', image:'https://imgflip.com/s/meme/Overly-Manly-Man.jpg', tags:'overlyManlyMan'});
  var babyGodfather       = new Meme({ title: 'Baby Godfather', image:'https://imgflip.com/s/meme/Baby-Godfather.jpg', tags:'babyGodfather'});
  var successKid          = new Meme({ title: 'Success Kid', image:'https://imgflip.com/s/meme/Success-Kid.jpg', tags:'successKid'});
  var josephDucreux       = new Meme({ title: 'Joseph Ducreux', image:'https://s-media-cache-ak0.pinimg.com/564x/eb/ce/09/ebce092a6a321fab49d9cae0b61ff07f.jpg', tags:'josephDucreux'});
  var futuramaFry         = new Meme({ title: 'Futurama Fry', image:'https://imgflip.com/s/meme/Futurama-Fry.jpg', tags:'futuramaFry'});
  var faceYouMake         = new Meme({ title: 'Face You Make', image:'https://s-media-cache-ak0.pinimg.com/236x/22/39/92/223992a371aecc5186878cda234a0b18.jpg', tags:'faceYouMake'});
  var yoDawgHeardYou      = new Meme({ title: 'Yo Dawg Heard You', image:'https://imgflip.com/s/meme/Yo-Dawg-Heard-You.jpg', tags:'yoDawgHeardYou'});
  var batmanSlap          = new Meme({ title: 'Batman Slap', image:'http://www.fotoefectos.com/efectos/examples/2/escena-fotomontaje-batman-robin-tortazo-meme.jpg', tags:'batmanSlap'});
  var africanDancingBaby  = new Meme({ title: 'African Danicng Baby', image:'https://i.ytimg.com/vi/LfqMgUkQpR0/hqdefault.jpg', tags:'africanDancingBaby'});
  var unhelpfulTeacher    = new Meme({ title: 'Unhelpful Teacher', image:'http://www.memecreator.org/static/images/templates/8274.jpg', tags:'unhelpfulTeacher'});
  var mindBlown           = new Meme({ title: 'Mind Blown', image:'http://i0.wp.com/conduit1.com/wp-content/uploads/blank-meme-013-keanue-reeves-mind-blown.jpg?resize=396%2C286', tags:'mindBlown'});
  var drinkMyOwnPiss      = new Meme({ title: 'Drink My own Piss', image:'http://demo.wpgoods.com/wp-content/uploads/2013/07/bear_grylls.jpg', tags:'drinkMyOwnPissMeme'});
  var starTrekWtf         = new Meme({ title: 'Star Trek WTF', image:'http://i.imgur.com/v4Ewvxz.png', tags:'starTrekWtf'});
  var thatEscalatedQuickly= new Meme({ title: 'That Escalated Quickly', image:'http://meme.ducknew.com/uploads/images/ron_burgundy_boy_that_escalated_quickly.jpg.png', tags:'boyThatEscalatedGuickly'});
  var youMeanToTellMe     = new Meme({ title: 'You Mean To Tell Me', image:'https://cdn.meme.am/images/5126800.jpg', tags: 'youMeanToTellMe'});
  var grumpyCat           = new Meme({ title: 'Grumpy Cat', image:'https://imgflip.com/s/meme/Grumpy-Cat.jpg', tags: 'grumpyCat'});
  var jackieChanWtf       = new Meme({ title: 'Jackie Chan WTF', image:'http://www.relatably.com/m/img/blank-memes-pictures/9296953505f39365f6.jpg', tags: 'jackieChanWtf'});
  var condescendingWonka  = new Meme({ title: 'Condescending Wonka', image:'https://imgflip.com/s/meme/Creepy-Condescending-Wonka.jpg', tags: 'condescendingWonka'});


var allMemes = [ youDontSay, foreverAlone, badLuckBrian, whyUNo, scumbagSteve, noFace, philosoraptor, oneCannotSimply,
overlyManlyMan, babyGodfather, successKid, josephDucreux, futuramaFry, faceYouMake, yoDawgHeardYou, batmanSlap,
africanDancingBaby, unhelpfulTeacher, mindBlown, drinkMyOwnPiss, starTrekWtf, thatEscalatedQuickly, youMeanToTellMe,
grumpyCat, jackieChanWtf, condescendingWonka]

// allMemes.forEach(function(meme) {
//   joe.memes.push(meme);
// });
  // return joe.save();

  return [ Meme.create(allMemes), User.findOne({ 'local.email': 'joe@hacker.com' }) ];
})
.spread(function(savedMemes, joe) {
  console.log('Just saved %s memes', savedMemes.length);
  joe.memes.push(savedMemes[0]);
  joe.memes.push(savedMemes[2]);
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
