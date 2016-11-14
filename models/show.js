var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Creator = require('./creator');

var CharacterSchema = new Schema({
  name: String,
});

var ShowSchema = new Schema({
  title: String,
  creator: {type: Schema.Types.ObjectId, ref: 'Creator'},
  image: String,
  releaseDate: String,
});

var Show = mongoose.model('Show', ShowSchema);
module.exports = Show;
