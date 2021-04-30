var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("menu", { title: "Menu - Herbaciarnia Ziołowa" });
});

module.exports = router;
