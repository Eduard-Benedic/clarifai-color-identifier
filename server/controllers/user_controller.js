const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/index").getSecret;

exports.signup = (req, res, next) => {
  const credentials = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  const user = new userModel(credentials);

  userModel.findOne({ username: req.body.username }, function(err, userStatus) {
    if (err) {
      console.log(err);
    } else {
      if (!userStatus) {
        user.save((err, uniqueUser) => {
          if (err) console.error(err);
          else {
            let token = jwt.sign({ id: uniqueUser._id }, secret(), {
              expiresIn: 86400 // expires in 24 hours
            });
            return res
              .status(200)
              .send({ auth: true, token: token, user: uniqueUser });
          }
        });
      }
    }
  });
};

exports.login = (req, res, next) => {
  const credentials = {
    username: req.body.name,
    password: req.body.password
  };

  userModel.find({ username: credentials.username }, function(err, docs) {
    if (err) console.log(err);
    if (docs.length > 0) {
      let isPasswordValid = bcrypt.compareSync(
        req.body.password,
        docs[0].password
      );

      if (!isPasswordValid) {
        return res.status(401).send({ auth: false, token: null });
      } else {
        let token = jwt.sign({ id: docs._id }, secret(), {
          expiresIn: 86400
        });
        return res
          .status(200)
          .json({ auth: true, token: token, user: docs[0] });
      }
    } else {
      return res.status(200).json({ auth: false, token: null });
    }
  });
};

exports.getProfile = (req, res, next) => {
  userModel
    .findById("5e7fa70070c4bd48fc34e8ff")
    .then(dbresponse => {
      res.status(200).json();
    })
    .catch(err => console.log(err));
};

exports.saveColor = (req, res, next) => {
  const username = req.body.user;
  const colorTheme = {
    raw_hex: req.body.raw_hex,
    color_name: req.body.color_name
  };

  userModel.findOneAndUpdate(
    { username: username },
    { $push: { colors: colorTheme } },
    (err, user) => {
      if (err) console.log(err);
      else {
        console.log(user);
        return res.status(200).json({ colors: user.colors });
      }
    }
  );
};
