var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var meme = require('./meme');

var UserSchema = new mongoose.Schema({
  local : {
    email    : String,
    password : String
  },
  memes : [meme.schema]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', UserSchema);