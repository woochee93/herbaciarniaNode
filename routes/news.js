var express = require("express");
var router = express.Router();

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

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
  findNews.find({}).sort({ created: -1 });
  findWorkshop.find({}).sort({ created: -1 });
  //doc is array db items
  findWorkshop.find({}, (err, docs) => {
    datas.item1 = docs;
    findNews.find({}, (err, docs) => {
      datas.item2 = docs;
      res.render("news", {
        title: "Aktualności - Herbaciarnia Ziołowa - Sobótka",
        datas,
      });
    });
  });
});
// click from  index banner
router.get("/:id", function (req, res, next) {
  let clickedArticle = [];
  News.findById(req.params.id, (err, article) => {
    clickedArticle = article;
  });

  const findNews = News.find();
  const findWorkshop = Workshop.find();
  // datas to PUG view
  let datas = {
    item1: [],
    item2: [],
  };
  //sort by add date to db
  findNews.find({}).sort({ created: -1 });
  findWorkshop.find({}).sort({ created: -1 });
  //doc is array db items
  findWorkshop.find({}, (err, docs) => {
    datas.item1 = docs;
    findNews.find({}, (err, docs) => {
      console.log(clickedArticle);
      datas.item2 = docs;
      res.render("news", {
        title: "Aktualności - Herbaciarnia Ziołowa - Sobótka",
        datas,
        clickedArticle,
      });
    });
  });
});
module.exports = router;
