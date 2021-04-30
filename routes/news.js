var express = require("express");
var router = express.Router();
const News = require("../models/news");
const Workshop = require("../models/workshop");

router.get("/", function (req, res, next) {
  const findNews = News.find();
  const findWorkshop = Workshop.find();
  // datas to PUG view
  let datas = {
    item1: [],
    item2: [],
  };
  //sort by add date to db
  findNews.find({}).sort({ _id: -1 });
  findWorkshop.find({}).sort({ _id: -1 });
  //doc is array db items
  findWorkshop.find({}, (err, docs) => {
    datas.item1 = docs;
  });

  findNews.find({}, (err, docs) => {
    datas.item2 = docs;
    res.render("news", { title: "News", datas });
  });
});

module.exports = router;
