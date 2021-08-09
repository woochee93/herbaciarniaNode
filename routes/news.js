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
  findNews.find({}).limit(7).sort({ created: -1 });
  findWorkshop.find({}).limit(7).sort({ created: -1 });
  //doc is array db items
  findWorkshop.find({}, (err, docs) => {
    datas.item1 = docs;
    findNews.find({}, (err, docs) => {
      datas.item2 = docs;
      res.render("news/news", {
        title: "Aktualności - Herbaciarnia Ziołowa - Sobótka",
        datas,
      });
    });
  });
});
////click button moreInfo
router.get("/moreNews/:from", function (req, res, next) {
  // const from = req.params.from ? req.params.from : 0;
  const from = req.params.from;
  const findNews = News.find().sort({ created: -1 });
  let dataNewsLength = 0;
  let newsdata = [];
  findNews.find({}, (err, docs) => {
    dataNewsLength = docs.length;
    newsdata = docs;
    newsdata = newsdata.slice((from - 1) * 7, (from - 1) * 7 + 7);
    console.log(newsdata);
    res.render("news/moreNews", {
      title: "Wszystkie wydarzenia - Herbaciarnia Ziołowa - Sobótka",
      newsdata,
      from,
      dataNewsLength,
    });
  });
});
////click button moreWorkshops
router.get("/moreWorkshops/:from", function (req, res, next) {
  // const from = req.params.from ? req.params.from : 0;
  const from = req.params.from;
  const findWorkshop = Workshop.find().sort({ created: -1 });
  let dataNewsLength = 0;
  let newsdata = [];
  findWorkshop.find({}, (err, docs) => {
    dataNewsLength = docs.length;
    newsdata = docs;
    newsdata = newsdata.slice((from - 1) * 7, (from - 1) * 7 + 7);
    console.log(newsdata);
    res.render("news/moreWorkshops", {
      title: "Wszystkie warsztaty - Herbaciarnia Ziołowa - Sobótka",
      newsdata,
      from,
      dataNewsLength,
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
      res.render("news/news", {
        title: "Aktualności - Herbaciarnia Ziołowa - Sobótka",
        datas,
        clickedArticle,
      });
    });
  });
});
module.exports = router;
