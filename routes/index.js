var express = require("express");
const News = require("../models/news");
var router = express.Router();
const config = require("../config");
const nodemailer = require("nodemailer");

router.get("/", function (req, res, next) {
  let datas = [];
  const findNews = News.find().limit(3);
  findNews.find({}).sort({ created: -1 });
  findNews.find({}, (err, doc) => {
    datas = doc;
    doc.forEach((article, index) => {
      datas[index].created = article.created.toISOString().slice(0, 10);
    });
    res.render("index", {
      title: "Start - Herbaciarnia Ziołowa - Sobótka",
      datas,
    });
  });
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

router.post("/send", (req, res) => {
  async function main() {
    var transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "654b0c48a6a913",
        pass: "bd807e43fdb317",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.email, // sender address
      to: "5ba875b635-c25ecb@inbox.mailtrap.io", // list of receivers
      subject: ` Wiadomość od ${req.body.name} ze strony herbaciarniaziolowa.pl`, // Subject line
      html: `<h1>Treść wiadomości</h1> <p>${req.body.message}</p></p></h1><h2>Numer telefonu do klienta:</h2> <p>${req.body.phone}</p>`, // plain text body
      //   html: "<b>Hello world?</b>", // html body
    });
    console.log(req.body.text);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  main().catch(console.error);
  // res.redirect("./");
});

module.exports = router;
