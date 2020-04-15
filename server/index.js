const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

let mongoose = require("mongoose");
var config = require("./config");
var port = 9000;

//==== ROUTES =====

const userRoutes = require("./routes/user");

app.use(
  cors({
    origin: "http://localhost:5100",
    credentials: true,
  })
);
// res.set("Access-Control-Allow-Credentials", true)
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRoutes);

mongoose.connect(
  config.getDbConnectionString(),
  { useNewUrlParser: true, useUnifiedTopology: true },
  function() {
    console.log("connected sucesful");
    app.listen(port);
  }
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
