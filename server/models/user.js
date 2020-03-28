var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  colors: Array
});

var user = mongoose.model("user", userSchema);

module.exports = user;
