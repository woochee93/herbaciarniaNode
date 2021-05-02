const express = require("express");
const News = require("../models/news");
const Workshop = require("../models/workshop");
var router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res) => {
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
    findNews.find({}, (err, docs) => {
      datas.item2 = docs;
      res.render("admin/index.pug", { title: "Panel administartora", datas });
    });
  });
});
router.get("/news/add", (req, res) => {
  const now = new Date().toISOString().slice(0, 10);
  res.render("admin/news-form", {
    title: "Dodaj wydarzenie",
    now,
  });
});
router.get("/workshop/add", (req, res) => {
  res.render("admin/workshop-form", {
    title: "Dodaj warsztat",
  });
});

router.post("/news/add", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const newsData = new News(body);
  const errors = newsData.validateSync();
  console.log(errors);
  newsData.save((err) => {
    console.log(err);
  });

  res.render("admin/news-form", { title: "Dodaj wydarzenie", errors });
});

router.post("/workshop/add", (req, res) => {
  const body = req.body;
  const workshopData = new Workshop(body);
  const errors = workshopData.validateSync();
  console.log(errors);
  workshopData.save((err) => {
    console.log(err);
  });
  res.render("admin/workshop-form", { title: "Dodaj warsztat", errors });
});

router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    console.log(req.params.id);
    res.redirect("/admin");
  });
});
router.get("/workshop/delete/:id", (req, res) => {
  Workshop.findByIdAndDelete(req.params.id, (err) => {
    console.log(req.params.id);
    res.redirect("/admin");
  });
});

module.exports = router;
