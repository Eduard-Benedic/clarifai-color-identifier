const userModel = require("../models/user");

exports.getProfile = (req, res, next) => {
  userModel
    .findById("5e7fa70070c4bd48fc34e8ff")
    .then(dbresponse => {
      res.json(dbresponse.colors);
    })
    .catch(err => console.log(err));
};

exports.signup = (req, res, next) => {
  const credentials = {
    username: req.body.username,
    password: req.body.password
  };

  const user = new userModel(credentials);

  user.save((err, uniqueUser) => {
    if (err) return console.error(err);

    res.send(uniqueUser);
  });
};

exports.login = (req, res, next) => {
  const credentials = {
    username: req.body.name,
    password: req.body.password
  };
  userModel.find(credentials, function(err, docs) {
    if (docs.length > 0) {
      console.log(docs);
      res.json({ logged: true });
      return;
    } else {
      res.json({ logged: false });
    }
  });
};

exports.saveColor = (req, res, next) => {
  const color = {
    raw_hex: req.body.raw_hex,
    color_name: req.body.color_name
  };

  userModel.findByIdAndUpdate(
    "5e7fa70070c4bd48fc34e8ff",
    {
      $push: { colors: color }
    },
    (err, dbres) => {
      if (err) console.log(err);

      res.json({ succes: "fine" });
    }
  );
};
