var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var profileSchema = new Schema({
  username: String,
  password: String
});

var profile = mongoose.model("profile", profileSchema);

module.exports = profile;
