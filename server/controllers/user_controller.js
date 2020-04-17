const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/index").getSecret;

exports.signup = (req, res, next) => {
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
    password: req.body.password,
  };

  userModel.findOne({ username: credentials.username }, (err, user) => {
    if (err) return console.log("error", err);

    const password = user.password;
    const checkPassword = bcrypt.compareSync(credentials.password, password);

    if (!checkPassword) {
      return res.status(401).send({ auth: false, token: null });
    } else {
      const token = jwt.sign({ id: user._id }, secret(), {
        expiresIn: 60 * 60, // 1 hour
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
    return res.status(200).json({ userProfile: dbResponse });
  });
};

exports.saveColor = (req, res, next) => {
  const cookieToken = req.cookies.token;
  const userId = jwt.verify(cookieToken, secret()).id;
  console.log("=================");
  console.log(req.body);
  console.log("==================");
  const colorTheme = {
    raw_hex: req.body.payload.raw_hex,
    color_name: req.body.payload.color_name,
  };

  console.log(colorTheme);
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

exports.deleteColor = (req, res, next) => {
  const colorName = req.body.colorName;
  const colorHex = req.body.colorHex;

  const cookieToken = req.cookies.token;
  const userId = jwt.verify(cookieToken, secret()).id;

  userModel.findById(userId, (err, dbResponse) => {
    if (err) return console.log(err);
    const colorArr = dbResponse.colors;
    const newColorArr = colorArr.filter((color) => {
      return colorHex != color.raw_hex;
    });

    userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { colors: newColorArr } },
      (err, dbres) => {
        if (err) return console.log(err);
        console.log("dbres", dbres);
        return res.status(200).json({ colors: dbres.colors });
      }
    );
  });
};
