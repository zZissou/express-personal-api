var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Creator = require('./creator');

var CharacterSchema = new Schema({
  name: String,
});

var ShowSchema = new Schema({
  title: String,
  mainCharacter, String,
  creator: {type: Schema.Types.ObjectId, ref: 'Creator'},
  image: String,
  releaseDate: String,
  seasons: String,
  characters: [CharacterSchema]
});

var Show = mongoose.model('Show', BookSchema);
module.exports = Show;



// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;

// var CampsiteSchema = new Schema({
//   description: String
// });

// var Campsite = mongoose.model('Campsite', CampsiteSchema);

// module.exports = Campsite;
