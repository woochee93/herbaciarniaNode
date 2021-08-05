var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
  res.render("gallery/gallery", {
    title: "Galeria - Herbaciarnia Ziołowa - Sobótka",
  });
});

router.get("/tea", function (req, res, next) {
  res.render("gallery/subgallery/galleryTea", {
    title: "Herbata - Galeria - Herbaciarnia Ziołowa - Sobótka",
  });
});

router.get("/interior", function (req, res, next) {
  res.render("gallery/subgallery/galleryInterior", {
    title: "Wnętrze - Galeria - Herbaciarnia Ziołowa - Sobótka",
  });
});
router.get("/store", function (req, res, next) {
  res.render("gallery/subgallery/galleryStore", {
    title: "Sklep - Galeria - Herbaciarnia Ziołowa - Sobótka",
  });
});
router.get("/events", function (req, res, next) {
  res.render("gallery/subgallery/galleryEvents", {
    title: "Wydarzenia - Galeria - Herbaciarnia Ziołowa - Sobótka",
  });
});
router.get("/workshops", function (req, res, next) {
  res.render("gallery/subgallery/galleryWorkshops", {
    title: "Warsztaty - Galeria - Herbaciarnia Ziołowa - Sobótka",
  });
});

module.exports = router;
