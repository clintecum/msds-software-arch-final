const api = require("./api/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const passport = require("passport");
const path = require("node:path");
const session = require("express-session");
const crypto = require("crypto");
const LocalHtpasswdStrategy = require("passport-local-htpasswd").Strategy;

const app = express();
const router = express.Router();
const HTPASSWD = path.join(__dirname, "./.htpasswd");
const sessionOptions = {
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: "none",
  },
  secret: crypto.randomBytes(32).toString("base64"),
  resave: true,
  saveUninitialized: true,
};

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

passport.use(new LocalHtpasswdStrategy({ file: HTPASSWD }));
passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((user, done) => done(null, user));
app.use(passport.initialize());
app.use(session(sessionOptions));
app.use(passport.session());

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"]
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, PATCH,POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use('/', router);
app.use("/v1", api);

module.exports = app;