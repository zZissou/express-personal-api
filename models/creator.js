var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CreatorSchema = new Schema({
  name: String
});

var Creator = mongoose.model('Creator', CreatorSchema);

module.exports = Creator;
