const profileModel = require("../models/profile");

exports.getProfile = (req, res, next) => {
  res.json({
    name: "Eduard",
    controller: "profile Controller",
    stuff: "okaaaay",
    morestuff: "asdasd"
  });
};

exports.signup = (req, res, next) => {
  const credentials = {
    username: req.body.username,
    password: req.body.password
  };

  const profile = new profileModel(credentials);

  profile.save((err, uniqueProfile) => {
    if (err) return console.error(err);

    res.send(uniqueProfile);
  });
};
