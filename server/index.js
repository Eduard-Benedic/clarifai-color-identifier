const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

let mongoose = require("mongoose");
var config = require("./config");
const PORT = 9000;

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use(cookieParser());

//================== MULTER ==============

app.use("/user", userRoutes);

mongoose.connect(
  config.getDbConnectionString(),
  { useNewUrlParser: true, useUnifiedTopology: true },
  function() {
    app.listen(PORT);
    console.log("connected sucesful");
  }
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
