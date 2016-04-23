var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var videoSchema = mongoose.Schema({
  loc: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d'
  },
  type: { type: String },
  description: { type: String },
  title: { type: String, required: true },
  filename: { type: String },
  likes: { type: Number }
});

videoSchema.plugin(timestamps);

module.exports = mongoose.model('Video', videoSchema);

