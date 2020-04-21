const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/index").getSecret;
const { check, validationResult } = require("express-validator");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const credentials = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
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
              expiresIn: 86400, // expires in 24 hours
            });
            return res.status(200).send({
              auth: true,
              token: token,
              user: {
                username: uniqueUser.username,
                colors: uniqueUser.colors,
              },
            });
          }
        });
      }
    }
  });
};

exports.login = (req, res, next) => {
  const credentials = {
    username: req.body.name,
    password: req.body.password,
  };

  userModel.findOne({ username: credentials.username }, (err, user) => {
    if (err) return console.log("error", err);

    const password = user.password;
    const checkPassword = bcrypt.compareSync(credentials.password, password);

    if (!checkPassword) {
      return res.status(401).send({
        auth: false,
        token: null,
        msg: "Authentication failed, try again",
      });
    } else {
      const token = jwt.sign({ id: user._id }, secret(), {
        expiresIn: 60 * 60, // expires in 1 hour
      });

      res.cookie("userToken", "sometoken");
      return res.status(200).json({ auth: true, token });
    }
  });
};

exports.populateProfile = (req, res, next) => {
  const cookieToken = req.cookies.token;

  const userId = jwt.verify(cookieToken, secret()).id;

  userModel.findById(userId, (error, dbResponse) => {
    if (error) return console.log(error);
    console.log("Populate Profile", dbResponse);
    return res.status(200).json({
      userProfile: {
        username: dbResponse.username,
        colors: dbResponse.colors,
      },
    });
  });
};

exports.saveColor = (req, res, next) => {
  const cookieToken = req.cookies.token;
  const userId = jwt.verify(cookieToken, secret()).id;
  const colorTheme = {
    raw_hex: req.body.payload.raw_hex,
    color_name: req.body.payload.color_name,
  };

  userModel.findByIdAndUpdate(
    userId,
    { $push: { colors: colorTheme } },
    (err, user) => {
      if (err) console.log(err);
      else {
        return res.status(200).json({ colors: user.colors });
      }
    }
  );
};

exports.deleteColor = async (req, res, next) => {
  const colorHex = req.body.colorHex;

  const cookieToken = req.cookies.token;
  const userId = jwt.verify(cookieToken, secret()).id;

  await userModel.findById(userId, (err, dbResponse) => {
    if (err) return console.log(err);
    const colorArr = dbResponse.colors;
    const newColorArr = colorArr.filter((color) => {
      return colorHex != color.raw_hex;
    });

    dbResponse.updateOne({ $set: { colors: newColorArr } }, function(e, r) {});

    userModel.findById(userId, (err, dbResponse) => {
      if (err) return console.log(err);
      console.log(dbResponse);
      return res.status(200).json({ colors: dbResponse.colors });
    });
  });
};
