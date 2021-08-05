var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("gallery", { title: "Galeria - Herbaciarnia Ziołowa - Sobótka" });
});

module.exports = router;
