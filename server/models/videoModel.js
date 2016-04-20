var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var videoSchema = mongoose.Schema({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  type: { type: String },
  description: { type: String },
  title: { type: String, required: true },
  filename: {type: String},
});

videoSchema.plugin(timestamps);

module.exports = mongoose.model('Video', videoSchema);


