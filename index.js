const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongotConnection = require("./db-config/mongodb");

const preLaunchAPI = require("./routes/PrelaunchAPIs");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());
app.use(express.static("build"));

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("API requested from " + origin);
      if (!origin || origin == "undefined") {
        callback(null, true);
      } else if (
        origin.indexOf("localhost") > -1 ||
        origin.indexOf("ideatribe") > -1
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS" + origin));
      }
    },
  })
);

app.use((req, res, next) => {
  console.log("req.headers.referer" )
  console.log(req.header("x-forwarded-proto"))
  if (req.header("x-forwarded-proto") != undefined && req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  }
  else {
    next();
    
  }
    
});

app.use("/api", preLaunchAPI); 

console.log("Checking node environment ::" + process.env.NODE_ENV);
if (process.env.NODE_ENV == "production") {
  console.log("Found node environment as" + process.env.NODE_ENV);
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
