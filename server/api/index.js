const express = require("express");
const passport = require("passport");
const auth = require("../lib/auth");

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
};

const authenticateUser = async (req, res, next) => {
  passport.authenticate("local-htpasswd", {}, (err, user) => {
    if (err) {
      return res.status(500).send("An error occurred");
    }

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    req.session.passport = { user: user.username };
    req.user = user.username;
    next();
  })(req, res, next);
};

router.post("/login", authenticateUser, (req, res) => {
  try {
    res.status(200).json({ message: "OK" });
  } catch (e) {
    res.status(500).send("An error occurred");
  }
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  try {
    const data = {
        classes: [
            { name: "Math", grade: "A", teacher: "Mr. Smith" },
            { name: "Science", grade: "B", teacher: "Ms. Johnson" },
            { name: "History", grade: "C", teacher: "Ms. Davis" },
        ]
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
