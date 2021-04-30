var express = require("express");
var router = express.Router();
const config = require("../config");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Start - Herbaciarnia Ziołowa" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Logowanie - Panel administratora" });
});
router.post("/login", (req, res) => {
  const body = req.body;

  if (body.login === config.login && body.password === config.pass) {
    req.session.admin = 1;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
