const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

let mongoose = require("mongoose");
var config = require("./config");
var port = 9000;

//==== ROUTES =====

const profileRoutes = require("./routes/profile");

app.use(cors());
app.use(bodyParser.json());

app.use("/profile", profileRoutes);
app.get("/", (req, res, next) => {
  res.send("<h1>Whatsap </h1>");
});

mongoose.connect(
  config.getDbConnectionString(),
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  function() {
    console.log("connected sucesful");
    app.listen(9000);
  }
);
