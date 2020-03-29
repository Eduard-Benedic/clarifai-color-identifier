const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

let mongoose = require("mongoose");
var config = require("./config");
var port = 9000;

//==== ROUTES =====

const userRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.get("/", (req, res, next) => {
  res.send("<h1>Whatsap </h1>");
});

mongoose.connect(
  config.getDbConnectionString(),
  { useNewUrlParser: true, useUnifiedTopology: true },
  function() {
    console.log("connected sucesful");
    app.listen(9000);
  }
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
