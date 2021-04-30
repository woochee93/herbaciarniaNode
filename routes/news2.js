var express = require("express");
var router = express.Router();
const News = require("../models/news");
const Workshop = require("../models/workshop");
router.get("/", function (req, res, next) {
  const findNews = News.find();
  const findWorkshop = Workshop.find();
  findNews.find({}).sort({ _id: -1 });
  findWorkshop.find({}).sort({ _id: -1 });
  findWorkshop.find({}, function (err, docs) {
    console.log(docs);
  });
  res.render("news", { title: "News", data });
});

module.exports = router;
