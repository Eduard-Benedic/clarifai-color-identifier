var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  colors: [
    {
      raw_hex: String,
      color_name: String
    }
  ]
});

var user = mongoose.model("user", userSchema);

module.exports = user;
