var mongoose = require('mongoose');
// mongoose.connect('mongodb)

var MemeSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref : 'User'},
  title: { type: String,  required: true },
  top: { type: String,  required: true },
  bottom: { type: String,  required: true },
  image: { type: String,  required: true },
  tags:  [ { type: String } ],
  },
  { timestamps: true }  // createdAt, updatedAt
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

MemeSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

MemeSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};
module.exports = mongoose.model('Meme', MemeSchema);
