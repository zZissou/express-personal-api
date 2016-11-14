var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Show = require("./show.js");
module.exports.Creator = require("./creator.js");
