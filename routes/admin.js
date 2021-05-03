const express = require("express");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

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

router.post("/news/add", upload.single("image"), (req, res) => {
  if (req.file) req.body.image = `/uploads/${req.file.originalname}`;
  const body = req.body;
  // const file = req.file;
  // console.log(file);
  console.log(req.body);
  const newsData = new News(body);
  const errors = newsData.validateSync();
  newsData.save((err) => {
    if (err) console.log(err);
  });

  res.render("admin/news-form", { title: "Dodaj wydarzenie", errors });
});

router.post("/workshop/add", upload.single("image"), (req, res) => {
  if (req.file) req.body.image = `/uploads/${req.file.originalname}`;
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
    res.redirect("/admin");
  });
});
router.get("/workshop/delete/:id", (req, res) => {
  Workshop.findByIdAndDelete(req.params.id, (err) => {
    console.log(req.params.id);
    res.redirect("/admin");
  });
});
// ---------------------START EDIT NEWS/WORKSHOP----------------------
router.get("/news/edit/:id", (req, res) => {
  News.findById(req.params.id, (err, news) => {
    const dateNews = news.created.toISOString().slice(0, 10);
    res.render("admin/news-edit", {
      title: "Edytuj wydarzenie",
      news,
      dateNews,
    });
  });
});
router.post("/news/edit/:id", upload.single("image"), (req, res) => {
  if (req.file) req.body.image = `/uploads/${req.file.originalname}`;
  const body = req.body;
  News.findByIdAndUpdate(req.params.id, body, (err, news) => {
    console.log(err);
    res.redirect(`/admin/news/edit/${req.params.id}`);
  });
});
router.get("/workshop/edit/:id", (req, res) => {
  Workshop.findById(req.params.id, (err, workshop) => {
    const startWorkshop = workshop.start.toISOString().slice(0, 19);
    const endWorkshop = workshop.end.toISOString().slice(0, 19);
    res.render("admin/workshop-edit", {
      title: "Edytuj warsztat",
      workshop,
      startWorkshop,
      endWorkshop,
    });
  });
});
router.post("/workshop/edit/:id", upload.single("image"), (req, res) => {
  if (req.file) req.body.image = `/uploads/${req.file.originalname}`;
  const body = req.body;
  Workshop.findByIdAndUpdate(req.params.id, body, (err, news) => {
    console.log(err);
    res.redirect(`/admin/workshop/edit/${req.params.id}`);
  });
});
// ---------------------END EDIT NEWS/WORKSHOP----------------------
module.exports = router;
